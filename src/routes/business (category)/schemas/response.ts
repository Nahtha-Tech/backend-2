import { t } from "elysia";

const CategoryResponseSchema = t.Object({
  id: t.String(),
  slug: t.String(),
  name: t.Any(),
  imageUrl: t.Nullable(t.String()),
  organizationId: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const listCategoriesResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  categories: t.Array(CategoryResponseSchema),
});

export const createCategoryResponseSchema = CategoryResponseSchema;
export const updateCategoryResponseSchema = CategoryResponseSchema;
export const deleteCategoryResponseSchema = t.Null();
export const showCategoryResponseSchema = CategoryResponseSchema;