import { t } from "elysia";

const ItemResponseSchema = t.Object({
  id: t.String(),
  slug: t.String(),
  name: t.Any(),
  description: t.Nullable(t.Any()),
  imageUrl: t.Array(t.String()),
  basePrice: t.String(),
  variantGroups: t.Nullable(t.Any()),
  organizationId: t.String(),
  categoryId: t.Nullable(t.String()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const listItemsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  items: t.Array(ItemResponseSchema),
});

export const searchItemsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  items: t.Array(ItemResponseSchema),
});

export const createItemResponseSchema = ItemResponseSchema;
export const updateItemResponseSchema = ItemResponseSchema;
export const deleteItemResponseSchema = t.Null();
export const showItemResponseSchema = ItemResponseSchema;