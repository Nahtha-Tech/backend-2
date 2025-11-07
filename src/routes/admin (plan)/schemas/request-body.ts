import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

export const createPlanBodySchema = t.Object({
  name: LocalStringSchema,
  description: t.Optional(LocalStringSchema),
  price: t.Number({
    minimum: 0,
    description: "Plan price in IQD",
    examples: [50000],
  }),
  durationInDays: t.Number({
    minimum: 1,
    description: "Plan duration in days",
    examples: [30],
  }),
  maxCategories: t.Number({
    minimum: 1,
    description: "Maximum categories",
    examples: [10],
  }),
  maxItems: t.Number({
    minimum: 1,
    description: "Maximum items",
    examples: [50],
  }),
  maxStaff: t.Number({
    minimum: 1,
    description: "Maximum staff members",
    examples: [5],
  }),
  maxMedia: t.Number({
    minimum: 1,
    description: "Maximum media files",
    examples: [100],
  }),
  isActive: t.Optional(t.Boolean({ default: true })),
});

export const updatePlanBodySchema = t.Object({
  name: t.Optional(LocalStringSchema),
  description: t.Optional(LocalStringSchema),
  price: t.Optional(
    t.Number({
      minimum: 0,
      description: "Plan price in IQD",
      examples: [50000],
    })
  ),
  durationInDays: t.Optional(
    t.Number({
      minimum: 1,
      description: "Plan duration in days",
      examples: [30],
    })
  ),
  maxCategories: t.Optional(
    t.Number({
      minimum: 1,
      description: "Maximum categories",
    })
  ),
  maxItems: t.Optional(
    t.Number({
      minimum: 1,
      description: "Maximum items",
    })
  ),
  maxStaff: t.Optional(
    t.Number({
      minimum: 1,
      description: "Maximum staff members",
    })
  ),
  maxMedia: t.Optional(
    t.Number({
      minimum: 1,
      description: "Maximum media files",
    })
  ),
  isActive: t.Optional(t.Boolean()),
});
