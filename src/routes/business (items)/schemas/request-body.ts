import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const ItemVariantOptionSchema = t.Object({
  label: LocalStringSchema,
  priceModifier: t.String({
    description: "Price modifier as string",
    examples: ["0", "2.50", "-1.00"],
  }),
  isDefault: t.Optional(t.Boolean()),
  imageUrl: t.Optional(t.String({ format: "uri" })),
  color: t.Optional(t.String()),
});

const ItemVariantGroupSchema = t.Object({
  name: LocalStringSchema,
  required: t.Boolean(),
  allowMultiple: t.Boolean(),
  options: t.Array(ItemVariantOptionSchema),
});

export const createItemBodySchema = t.Object({
  name: LocalStringSchema,
  description: t.Optional(LocalStringSchema),
  slug: t.String({
    format: "uri-reference",
    description: "Item slug (unique identifier)",
    examples: ["grilled-chicken"],
  }),
  imageUrl: t.Optional(
    t.Array(
      t.String({
        format: "uri",
        description: "Item image URLs",
      })
    )
  ),
  basePrice: t.String({
    description: "Base price as string",
    examples: ["15.99"],
  }),
  variantGroups: t.Optional(t.Array(ItemVariantGroupSchema)),
});

export const updateItemBodySchema = t.Object({
  name: t.Optional(LocalStringSchema),
  description: t.Optional(LocalStringSchema),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Item slug (unique identifier)",
      examples: ["grilled-chicken"],
    })
  ),
  imageUrl: t.Optional(
    t.Array(
      t.String({
        format: "uri",
        description: "Item image URLs",
      })
    )
  ),
  basePrice: t.Optional(
    t.String({
      description: "Base price as string",
      examples: ["15.99"],
    })
  ),
  variantGroups: t.Optional(t.Array(ItemVariantGroupSchema)),
});
