import { t } from "elysia";

export const getMenuStructureQueryParamsSchema = t.Object({
  includeData: t.Optional(
    t.Boolean({
      default: false,
      description: "Include category and item details in the structure",
    })
  ),
});
