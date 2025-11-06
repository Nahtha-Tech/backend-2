import { t } from "elysia";

export const getMenuStructureQueryParamsSchema = t.Object({
  includeData: t.Optional(
    t.Boolean({
      default: false,
      description: "Include category and item details in the structure",
    })
  ),
});

export const listPaymentsQueryParamsSchema = t.Object({
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
  isPaid: t.Optional(
    t.Boolean({
      description: "Filter by payment status",
    })
  ),
});
