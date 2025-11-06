import { t } from "elysia";

export const itemSelectQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Item id",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Item slug",
    })
  ),
});

export const listItemsQueryParamsSchema = t.Object({
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

export const searchItemsQueryParamsSchema = t.Object({
  search: t.String({
    minLength: 1,
    description: "Search term for item name",
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