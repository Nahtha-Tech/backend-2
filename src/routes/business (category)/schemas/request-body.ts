import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

export const createCategoryBodySchema = t.Object({
  name: LocalStringSchema,
  slug: t.String({
    format: "uri-reference",
    description: "Category slug (unique identifier)",
    examples: ["appetizers"],
  }),
  imageUrl: t.Optional(
    t.String({
      format: "uri",
      description: "Category image URL",
      examples: ["https://example.com/category.jpg"],
    })
  ),
});

export const updateCategoryBodySchema = t.Object({
  name: t.Optional(LocalStringSchema),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Category slug (unique identifier)",
      examples: ["appetizers"],
    })
  ),
  imageUrl: t.Optional(
    t.String({
      format: "uri",
      description: "Category image URL",
      examples: ["https://example.com/category.jpg"],
    })
  ),
});