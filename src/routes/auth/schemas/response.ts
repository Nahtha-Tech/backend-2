import { t } from "elysia";
import { UserRole } from "@prisma/client";

const signinResponse = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

const signupResponse = t.Object({
  id: t.String(),
  email: t.String(),
  name: t.String(),
  avatarUrl: t.Nullable(t.String()),
  role: t.Enum({
    Admin: UserRole.Admin,
    User: UserRole.User,
  }),
});

const getMeResponse = t.Object({
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

const updateProfileResponse = t.Object({
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

const signoutResponse = t.Null();
const refreshTokensResponse = t.Null();

export {
  signinResponse,
  signoutResponse,
  refreshTokensResponse,
  getMeResponse,
  signupResponse,
  updateProfileResponse,
};
