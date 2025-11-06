import { t } from "elysia";

const PlanResponseSchema = t.Object({
  id: t.String(),
  name: t.Any(),
  description: t.Nullable(t.Any()),
  price: t.Number(),
  maxCategories: t.Number(),
  maxItems: t.Number(),
  maxStaff: t.Number(),
  maxMedia: t.Number(),
  isActive: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const adminListPlansResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  plans: t.Array(PlanResponseSchema),
});

export const adminCreatePlanResponseSchema = PlanResponseSchema;
export const adminUpdatePlanResponseSchema = PlanResponseSchema;
export const adminDeletePlanResponseSchema = t.Null();
export const adminShowPlanResponseSchema = PlanResponseSchema;
