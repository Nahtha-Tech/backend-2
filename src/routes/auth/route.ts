import Elysia, { t } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import {
  signinDocs,
  signupDocs,
  signoutDocs,
  refreshDocs,
  meDocs,
  forgotPasswordDocs,
  resetPasswordDocs,
  updateProfileDocs,
} from "./docs/docs";
import {
  forgotPasswordBodySchema,
  resetPasswordBodySchema,
  signinBody,
  signupBody,
  updateProfileBody,
} from "./schemas/request-body";
import {
  authcheckIfUserExists,
  forgotPassword,
  me,
  refreshTokens,
  resetPassword,
  signin,
  signout,
  signup,
  updateProfile,
} from "./service";
import Response from "@/src/utils/global-response";
import { jwt } from "@elysiajs/jwt";
import {
  signinResponse,
  signupResponse,
  signoutResponse,
  refreshTokensResponse,
  getMeResponse,
  updateProfileResponse,
} from "./schemas/response";
import ApiError from "@/src/utils/global-error";
import {
  authRoutesRateLimit,
  forgotPasswordLimit,
} from "@/src/utils/constants";
import { UserRole } from "@/prisma/prismabox/UserRole";
import { authPlugin } from "@/src/plugins/auth-plugin";

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
      }),
      exp: "1h",
    })
  )
  .use(
    jwt({
      name: "refreshJwt",
      secret: Bun.env.JWT_SECRET!,
      schema: t.Object({
        sub: t.String(),
        role: UserRole,
      }),
      exp: "5d",
    })
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
    })
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
        }
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
        }
      )
  )

  .post(
    "/sign-out",
    async ({ cookie: { accessToken, refreshToken } }) => {
      return await signout(accessToken, refreshToken);
    },
    {
      detail: signoutDocs,
      response: Response(signoutResponse),
    }
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
      });
      if (!newSignedAccessToken)
        throw new ApiError("Error while trying to sign new access token");

      const newSignedRefreshToken = await refreshJwt.sign({
        sub: payload.sub,
        role: payload.role,
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
    }
  )

  .group("", (app) =>
    app
      .use(forgotPasswordLimit)
      .post(
        "/forgot-password",
        async ({ body, resetJwt }) => {
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
        }
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
            verify.ref
          );

          return res;
        },
        {
          detail: resetPasswordDocs,
          body: resetPasswordBodySchema,
          response: Response(t.Null()),
        }
      )
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
    }
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
    }
  );
