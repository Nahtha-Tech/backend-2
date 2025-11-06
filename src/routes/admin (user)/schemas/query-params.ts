import { t } from "elysia";

export const userSelectQueryParams = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "User id",
    }),
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email",
    }),
  ),
});

export const adminListUsersQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "User id",
    }),
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email",
    }),
  ),
  name: t.Optional(
    t.String({
      description: "User name",
    }),
  ),
  role: t.Optional(
    t.Union([t.Literal("Admin"), t.Literal("User")], {
      description: "User role",
    }),
  ),
});

export const adminDeleteUserQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "User id",
  }),
});