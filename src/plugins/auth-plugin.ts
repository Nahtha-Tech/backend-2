import jwt from "@elysiajs/jwt";
import db from "@/src/utils/db";
import ApiError from "@/src/utils/global-error";
import Elysia, { t } from "elysia";
import { UserRole } from "../../prisma/prismabox/UserRole";

export const authPlugin = async (app: Elysia) =>
  app
    .use(
      jwt({
        name: "jwt",
        secret: Bun.env.JWT_SECRET!,
        schema: t.Object({
          sub: t.String(),
          role: UserRole,
        }),
        exp: "1h",
      })
    )
    .derive(async ({ jwt, cookie: { accessToken, refreshToken } }) => {
      // check if the user has accessToken
      if (!accessToken.value) throw new ApiError("Unautherized.", 401);

      // check if the user is signed in
      const payload = await jwt.verify(accessToken.value.toString());
      if (!payload) throw new ApiError("Unautherized.", 401);

      // get the user
      const user = await db.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user?.id)
        throw new ApiError("User Doesnt Exists, Unautherized call");

      return {
        user,
      };
    });

export const adminCheckPlugin = (app: Elysia) =>
  app.use(authPlugin).derive(async ({ user }) => {
    if (!user?.id) throw new ApiError("Unautherized.", 401);

    if (user.role !== "Admin") throw new ApiError("Unautherized call.");
  });

// export const businessPlugin = async (app: Elysia) =>
//   app.use(authPlugin).derive(async ({ user }) => {
//     if (!user?.id) throw new ApiError("User Doesnt Exists, Unautherized call");
//     if (!user.selectedBranchSlug)
//       throw new ApiError("Please select branch first.");

//     if (!user.selectedOrganizationSlug) {
//       throw new ApiError("No organization selected");
//     }

//     const org = await db.organization.findUnique({
//       where: { slug: user.selectedOrganizationSlug },
//       include: { plan: true },
//     });

//     if (!org?.id) throw new ApiError("Organization not found");

//     // Block if suspended
//     if (org.subscriptionStatus === "SUSPENDED") {
//       throw new ApiError(
//         "Subscription expired. Please contact admin to renew your subscription."
//       );
//     }

//     // Check expiration and apply grace period
//     const now = new Date();
//     if (org.subscriptionEndsAt && now > org.subscriptionEndsAt) {
//       const graceEnd = new Date(org.subscriptionEndsAt);
//       graceEnd.setDate(graceEnd.getDate() + 3);

//       if (now > graceEnd) {
//         await db.organization.update({
//           where: { id: org.id },
//           data: { subscriptionStatus: "SUSPENDED" },
//         });

//         throw new ApiError(
//           "Subscription expired. Please contact admin to renew your subscription."
//         );
//       }

//       // Within grace period
//       if (org.subscriptionStatus !== "GRACE") {
//         await db.organization.update({
//           where: { id: org.id },
//           data: { subscriptionStatus: "GRACE" },
//         });
//       }
//     }

//     return { organization: org };
//   });
