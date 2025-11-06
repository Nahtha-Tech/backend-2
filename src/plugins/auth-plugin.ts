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

export const businessPlugin = (app: Elysia) =>
  app
    .use(authPlugin)

    .derive(async ({ user }) => {
      if (!user?.id) throw new ApiError("Unauthorized.", 401);

      if (!user.organizationId)
        throw new ApiError("User not associated with any organization.");

      const org = await db.organization.findUnique({
        where: { id: user.organizationId },
        select: {
          subscriptionStatus: true,
          subscriptionEndsAt: true,
        },
      });

      if (
        org?.subscriptionStatus !== "Active" ||
        (org.subscriptionEndsAt && org.subscriptionEndsAt < new Date())
      ) {
        throw new ApiError("Subscription inactive or expired", 402);
      }

      return {
        organizationId: user.organizationId,
      };
    });
