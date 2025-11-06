import { t } from "elysia";

export const categorySelectQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Category id",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Category slug",
    })
  ),
});

export const listCategoriesQueryParamsSchema = t.Object({
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

export const searchCategoriesQueryParamsSchema = t.Object({
  search: t.String({
    minLength: 1,
    description: "Search term for category name",
    examples: ["pizza"],
  }),
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
