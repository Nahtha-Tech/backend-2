import { t } from "elysia";

export const publicOrgQueryParamsSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
  }),
});

export const publicCategoriesQueryParamsSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
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

export const publicItemsQueryParamsSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
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
  categoryId: t.Optional(
    t.String({
      format: "uuid",
      description: "Filter by category ID",
    })
  ),
});

export const publicItemDetailsQueryParamsSchema = t.Object({
  orgSlug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
  }),
  itemSlug: t.String({
    format: "uri-reference",
    description: "Item slug",
    examples: ["grilled-chicken"],
  }),
});

export const publicMenuStructureQueryParamsSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
  }),
  includeData: t.Optional(
    t.Boolean({
      default: true,
      description: "Include category and item details in the structure",
    })
  ),
});

export const publicSearchItemsQueryParamsSchema = t.Object({
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug",
    examples: ["omaro-llc"],
  }),
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