import Elysia, { t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import {
  signinDocs,
  signupDocs,
  signoutDocs,
  refreshDocs,
  meDocs,
  switchOrgDocs,
  switchBranchDocs,
  branchesDocs,
  orgsDocs,
  forgotPasswordDocs,
  resetPasswordDocs,
  updateProfileDocs,
} from "./docs/docs";
import {
  forgotPasswordBodySchema,
  resetPasswordBodySchema,
  signinBody,
  signupBody,
  switchBranchBody,
  switchOrgBody,
  updateProfileBody,
} from "./schemas/request-body";
import {
  authcheckIfUserExists,
  forgotPassword,
  getBranches,
  getOrgs,
  me,
  refreshTokens,
  resetPassword,
  signin,
  signout,
  signup,
  switchBranch,
  switchOrg,
  updateProfile,
  userExistsInThisBranch,
  userExistsInThisOrg,
} from "./service";
import Response from "@src/utils/global-response";
import { jwt } from "@elysiajs/jwt";
import {
  signinResponse,
  signupResponse,
  signoutResponse,
  refreshTokensResponse,
  switchOrgResponse,
  switchBranchResponse,
  listBranchesResponse,
  listOrgsResponse,
  getMeResponse,
  updateProfileResponse,
} from "./schemas/response";
import { UserRole } from "prisma/prismabox/UserRole";
import ApiError from "@src/utils/global-error";
import { authPlugin } from "@src/plugins/auth-plugin";
import { authRoutesRateLimit, forgotPasswordLimit } from "@src/utils/constants";

export const authRoutes = new Elysia({
  prefix: "/auth",
  tags: ["auth"],
  cookie: {
    secure: true,
    httpOnly: true,
  },
})
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET!,
      schema: t.Object({
        sub: t.String(),
        role: UserRole,
        selectedOrganizationSlug: t.Optional(t.String()),
        selectedBranchSlug: t.Optional(t.String()),
      }),
      exp: "1h",
    }),
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: Bun.env.JWT_SECRET!,
      schema: t.Object({
        sub: t.String(),
        role: UserRole,
        selectedOrganizationSlug: t.Optional(t.String()),
        selectedBranchSlug: t.Optional(t.String()),
      }),
      exp: "5d",
    }),
  )
  .use(
    jwt({
      name: "resetJwt",
      secret: Bun.env.JWT_SECRET!,
      schema: t.Object({
        sub: t.String(),
        type: t.Literal("password-reset"),
        ref: t.String(),
      }),
      exp: "15m",
    }),
  )

  .group("", (app) =>
    app
      .use(authRoutesRateLimit)
      .post(
        "/sign-in",
        async ({
          body,
          jwt,
          refreshJwt,
          cookie: { accessToken, refreshToken },
        }) => {
          const user = await signin(body);

          const payload = { sub: user.data.id, role: user.data.role };

          const signedAccessToken = await jwt.sign(payload);
          if (!signedAccessToken)
            throw new ApiError("Error while trying to sign access token");

          const signedRefreshToken = await refreshJwt.sign(payload);
          if (!signedRefreshToken)
            throw new ApiError("Error while trying to sign refresh token");

          accessToken.set({
            value: signedAccessToken.toString(),
            maxAge: 60 * 60,
          });
          refreshToken.set({
            value: signedRefreshToken.toString(),
            maxAge: 5 * 24 * 60 * 60,
          });

          return user;
        },
        {
          detail: signinDocs,
          body: signinBody,
          response: Response(signinResponse),
        },
      )
      .post(
        "/sign-up",
        async ({ body }) => {
          return await signup(body);
        },
        {
          detail: signupDocs,
          body: signupBody,
          response: Response(signupResponse),
        },
      ),
  )

  .post(
    "/sign-out",
    async ({ cookie: { accessToken, refreshToken } }) => {
      return await signout(accessToken, refreshToken);
    },
    {
      detail: signoutDocs,
      response: Response(signoutResponse),
    },
  )
  .get(
    "/refresh-tokens",
    async ({ jwt, refreshJwt, cookie: { accessToken, refreshToken } }) => {
      const token = refreshToken.value;
      if (!token) throw new ApiError("Refresh token missing");

      const payload = await refreshJwt.verify(token.toString());
      if (!payload) throw new ApiError("Invalid or expired refresh token");

      const newSignedAccessToken = await jwt.sign({
        sub: payload.sub,
        role: payload.role,
        selectedBranchSlug: payload.selectedBranchSlug,
        selectedOrganizationSlug: payload.selectedOrganizationSlug,
      });
      if (!newSignedAccessToken)
        throw new ApiError("Error while trying to sign new access token");

      const newSignedRefreshToken = await refreshJwt.sign({
        sub: payload.sub,
        role: payload.role,
        selectedBranchSlug: payload.selectedBranchSlug,
        selectedOrganizationSlug: payload.selectedOrganizationSlug,
      });
      if (!newSignedRefreshToken)
        throw new ApiError("Error while trying to sign new refresh token");

      accessToken.set({
        value: newSignedAccessToken.toString(),
        maxAge: 60 * 60,
      });
      refreshToken.set({
        value: newSignedRefreshToken.toString(),
        maxAge: 5 * 24 * 60 * 60,
      });

      return await refreshTokens();
    },
    {
      detail: refreshDocs,
      response: Response(refreshTokensResponse),
    },
  )

  .group("", (app) =>
    app
      .use(forgotPasswordLimit)
      .post(
        "/forgot-password",
        async ({ body, resetJwt }) => {
          // check if user exists
          const user = await authcheckIfUserExists(body.email);

          const jwtPayload = await resetJwt.sign({
            sub: user.id,
            type: "password-reset",
            ref: user.password.substring(0, 10),
          });

          return await forgotPassword(body.email, jwtPayload);
        },
        {
          detail: forgotPasswordDocs,
          body: forgotPasswordBodySchema,
          response: Response(t.Null()),
        },
      )
      .post(
        "/reset-password",
        async ({ body, resetJwt }) => {
          const verify = await resetJwt.verify(body.token);
          if (!verify || verify.type !== "password-reset")
            throw new ApiError("Invalid or expired token.");
          const res = await resetPassword(
            verify.sub,
            body.newPassword,
            verify.ref,
          );

          return res;
        },
        {
          detail: resetPasswordDocs,
          body: resetPasswordBodySchema,
          response: Response(t.Null()),
        },
      ),
  )

  .use(authPlugin)
  .get(
    "/me",
    async ({ user }) => {
      return await me(user);
    },
    {
      detail: meDocs,
      response: Response(getMeResponse),
    },
  )
  .post(
    "/switch-org",
    async ({
      body,
      jwt,
      refreshJwt,
      cookie: { accessToken, refreshToken },
      user,
    }) => {
      if (!user) throw new ApiError("Unautherized.");

      await userExistsInThisOrg(user, body.organizationSlug);

      const newPayload = {
        sub: user.id,
        role: user.role,
        selectedOrganizationSlug: body.organizationSlug,
      };

      const newAccessToken = await jwt.sign(newPayload);
      const newRefreshToken = await refreshJwt.sign(newPayload);

      if (!newAccessToken || !newRefreshToken)
        throw new ApiError("Error while trying to sign new tokens.");

      accessToken.set({
        value: newAccessToken.toString(),
        maxAge: 60 * 60,
      });
      refreshToken.set({
        value: newRefreshToken.toString(),
        maxAge: 5 * 24 * 60 * 60,
      });

      return await switchOrg(body);
    },
    {
      detail: switchOrgDocs,
      body: switchOrgBody,
      response: Response(switchOrgResponse),
    },
  )
  .post(
    "/switch-branch",
    async ({
      body,
      jwt,
      refreshJwt,
      cookie: { accessToken, refreshToken },
      user,
    }) => {
      if (!user) throw new ApiError("Unautherized.");
      if (!user.selectedOrganizationSlug)
        throw new ApiError("you need to select organization first.");

      await userExistsInThisBranch(user, body.branchSlug);

      const newPayload = {
        sub: user.id,
        role: user.role,
        selectedOrganizationSlug: user.selectedOrganizationSlug,
        selectedBranchSlug: body.branchSlug,
      };

      const newAccessToken = await jwt.sign(newPayload);
      const newRefreshToken = await refreshJwt.sign(newPayload);

      if (!newAccessToken || !newRefreshToken)
        throw new ApiError("Error while trying to sign new tokens.");

      accessToken.set({
        value: newAccessToken.toString(),
        maxAge: 60 * 60,
      });
      refreshToken.set({
        value: newRefreshToken.toString(),
        maxAge: 5 * 24 * 60 * 60,
      });

      return await switchBranch(body);
    },
    {
      detail: switchBranchDocs,
      body: switchBranchBody,
      response: Response(switchBranchResponse),
    },
  )
  .get(
    "/branches",
    async ({ user }) => {
      return await getBranches(user);
    },
    {
      detail: branchesDocs,
      response: Response(listBranchesResponse),
    },
  )
  .get(
    "/orgs",
    async ({ user }) => {
      return await getOrgs(user);
    },
    {
      detail: orgsDocs,
      response: Response(listOrgsResponse),
    },
  )
  .patch(
    "/me",
    async ({ user, body }) => {
      return await updateProfile(user, body);
    },
    {
      detail: updateProfileDocs,
      body: updateProfileBody,
      response: Response(updateProfileResponse),
    },
  );
