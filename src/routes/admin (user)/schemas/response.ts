import { t } from "elysia";

const UserResponseSchema = t.Object({
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

export const adminListUsersResponseSchema = t.Array(UserResponseSchema);
export const adminCreateUserResponseSchema = UserResponseSchema;
export const adminUpdateUserResponseSchema = UserResponseSchema;
export const adminDeleteUserResponseSchema = t.Null();
export const adminShowUserResponseSchema = UserResponseSchema;
