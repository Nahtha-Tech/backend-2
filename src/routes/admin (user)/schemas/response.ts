import { t } from "elysia";
import { BranchPlain } from "prisma/prismabox/Branch";
import { OrganizationPlain } from "prisma/prismabox/Organization";

const UserResponse = t.Object({
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

export const adminListUsersResponse = t.Array(UserResponse);
export const adminCreateUserResponse = UserResponse;
export const adminUpdateUserResponse = UserResponse;
export const adminDeleteUserResponse = t.Null();
export const adminShowUserResponse = UserResponse;
export const adminListUserBranchesResponse = t.Array(
  t.Object({
    ...BranchPlain.properties,
    organization: OrganizationPlain,
  }),
);
