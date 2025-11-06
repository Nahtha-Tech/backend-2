import { t } from "elysia";
import { UserRole } from "@prisma/client";

export const signinResponseSchema = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

export const signupResponseSchema = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

export const getMeResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Union([t.Literal("Admin"), t.Literal("User")], {
    additionalProperties: false,
  }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const updateProfileResponseSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Union([t.Literal("Admin"), t.Literal("User")], {
    additionalProperties: false,
  }),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const signoutResponseSchema = t.Null();
export const refreshTokensResponseSchema = t.Null();
export const forgotPasswordResponseSchema = t.Null();
export const resetPasswordResponseSchema = t.Null();
