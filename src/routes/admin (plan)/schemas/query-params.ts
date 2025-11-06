import { t } from "elysia";

export const planSelectQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Plan id",
    })
  ),
});

export const adminListPlansQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Plan id",
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

export const adminDeletePlanQueryParamsSchema = t.Object({
  id: t.String({
    format: "uuid",
    description: "Plan id",
  }),
});