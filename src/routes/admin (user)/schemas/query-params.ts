import { t } from "elysia";

export const userSelectQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "User id",
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email",
    })
  ),
});

export const adminListUsersQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "User id",
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email",
    })
  ),
  name: t.Optional(
    t.String({
      description: "User name",
    })
  ),
  role: t.Optional(
    t.Union([t.Literal("Admin"), t.Literal("User")], {
      description: "User role",
    })
  ),
  page: t.Optional(
    t.Number({
      minimum: 1,
      default: 1,
      description: "Page number",
    })
  ),
  limit: t.Optional(
    t.Number({
      minimum: 1,
      maximum: 100,
      default: 10,
      description: "Items per page",
    })
  ),
});

export const adminDeleteUserQueryParamsSchema = t.Object({
  id: t.String({
    format: "uuid",
    description: "User id",
  }),
});
