import Elysia, { t } from "elysia";
import {
  signinDoc,
  signupDoc,
  signoutDoc,
  refreshDoc,
  meDoc,
  forgotPasswordDoc,
  resetPasswordDoc,
  updateProfileDoc,
} from "./docs/docs";
import {
  forgotPasswordBodySchema,
  resetPasswordBodySchema,
  signinBodySchema,
  signupBodySchema,
  updateProfileBodySchema,
} from "./schemas/request-body";
import {
  authcheckIfUserExistsService,
  forgotPasswordService,
  meService,
  refreshTokensService,
  resetPasswordService,
  signinService,
  signoutService,
  signupService,
  updateProfileService,
} from "./service";
import Response from "@/src/utils/global-response";
import { jwt } from "@elysiajs/jwt";
import {
  signinResponseSchema,
  signupResponseSchema,
  signoutResponseSchema,
  refreshTokensResponseSchema,
  getMeResponseSchema,
  updateProfileResponseSchema,
  forgotPasswordResponseSchema,
  resetPasswordResponseSchema,
} from "./schemas/response";
import { UserRole } from "@/prisma/prismabox/UserRole";
import ApiError from "@/src/utils/global-error";
import { authPlugin } from "@/src/plugins/auth-plugin";
import {
  authRoutesRateLimit,
  forgotPasswordLimit,
} from "@/src/utils/constants";

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
          const user = await signinService(body);

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
          detail: signinDoc,
          body: signinBodySchema,
          response: Response(signinResponseSchema),
        }
      )
      .post(
        "/sign-up",
        async ({ body }) => {
          return await signupService(body);
        },
        {
          detail: signupDoc,
          body: signupBodySchema,
          response: Response(signupResponseSchema),
        }
      )
      .post(
        "/sign-out",
        async ({ cookie: { accessToken, refreshToken } }) => {
          return await signoutService(accessToken, refreshToken);
        },
        {
          detail: signoutDoc,
          response: Response(signoutResponseSchema),
        }
      )
      .post(
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

          return await refreshTokensService();
        },
        {
          detail: refreshDoc,
          response: Response(refreshTokensResponseSchema),
        }
      )
  )

  .group("", (app) =>
    app
      .use(forgotPasswordLimit)
      .post(
        "/forgot-password",
        async ({ body, resetJwt }) => {
          const user = await authcheckIfUserExistsService(body.email);

          const jwtPayload = await resetJwt.sign({
            sub: user.id,
            type: "password-reset",
            ref: user.password.substring(0, 10),
          });

          return await forgotPasswordService(body.email, jwtPayload);
        },
        {
          detail: forgotPasswordDoc,
          body: forgotPasswordBodySchema,
          response: Response(forgotPasswordResponseSchema),
        }
      )
      .post(
        "/reset-password",
        async ({ body, resetJwt }) => {
          const verify = await resetJwt.verify(body.token);
          if (!verify || verify.type !== "password-reset")
            throw new ApiError("Invalid or expired token.");

          return await resetPasswordService(
            verify.sub,
            body.newPassword,
            verify.ref
          );
        },
        {
          detail: resetPasswordDoc,
          body: resetPasswordBodySchema,
          response: Response(resetPasswordResponseSchema),
        }
      )
  )

  .use(authPlugin)
  .get(
    "/me",
    async ({ user }) => {
      return await meService(user);
    },
    {
      detail: meDoc,
      response: Response(getMeResponseSchema),
    }
  )
  .patch(
    "/me",
    async ({ user, body }) => {
      return await updateProfileService(user, body);
    },
    {
      detail: updateProfileDoc,
      body: updateProfileBodySchema,
      response: Response(updateProfileResponseSchema),
    }
  );
