import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  createItemBodySchema,
  updateItemBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import {
  itemSelectQueryParamsSchema,
  listItemsQueryParamsSchema,
  searchItemsQueryParamsSchema,
} from "./schemas/query-params";

export const listItemsService = async (
  organizationId: string,
  params: Static<typeof listItemsQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    organizationId,
  };

  const [items, total] = await Promise.all([
    db.item.findMany({
      where,
      skip,
      take: limit,
    }),
    db.item.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "All items listed successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      items,
    },
  };
};

export const createItemService = async (
  organizationId: string,
  body: Static<typeof createItemBodySchema>
) => {
  const check = await db.item.findUnique({
    where: {
      slug: body.slug,
    },
  });
  if (check?.id) throw new ApiError("Item with this slug already exists");

  const newItem = await db.item.create({
    data: {
      name: body.name,
      description: body.description,
      slug: body.slug,
      imageUrl: body.imageUrl || [],
      basePrice: body.basePrice,
      variantGroups: body.variantGroups as any,
      organizationId,
    },
  });

  if (!newItem?.id)
    throw new ApiError("Issue happened while trying to add this item");

  return {
    success: true,
    message: "Created new item successfully",
    data: newItem,
  };
};

export const updateItemService = async (
  organizationId: string,
  params: Static<typeof itemSelectQueryParamsSchema>,
  body: Static<typeof updateItemBodySchema>
) => {
  const item = await db.item.findFirst({
    where: {
      ...params,
      organizationId,
    },
  });

  if (!item?.id) throw new ApiError("Item with this slug/id doesnt exist");

  if (body.slug) {
    const existingSlugItem = await db.item.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingSlugItem && existingSlugItem.id !== item.id) {
      throw new ApiError("Item with this slug already exists");
    }
  }

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.slug) updateData.slug = body.slug;
  if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
  if (body.basePrice) updateData.basePrice = body.basePrice;
  if (body.variantGroups !== undefined)
    updateData.variantGroups = body.variantGroups as any;

  const updating = await db.item.update({
    where: { id: item.id },
    data: updateData,
  });

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update item");

  return {
    success: true,
    message: "Item updated successfully",
    data: updating,
  };
};

export const deleteItemService = async (
  organizationId: string,
  params: Static<typeof itemSelectQueryParamsSchema>
) => {
  const item = await db.item.findFirst({
    where: {
      ...params,
      organizationId,
    },
  });
  if (!item?.id) throw new ApiError("Item with this slug/id doesnt exist");

  const deleting = await db.item.delete({
    where: { id: item.id },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete item");

  return {
    success: true,
    message: "Item deleted successfully",
    data: null,
  };
};

export const showItemService = async (
  organizationId: string,
  params: Static<typeof itemSelectQueryParamsSchema>
) => {
  if (!params.id && !params.slug)
    throw new ApiError("Please provide id or slug of the item");

  const item = await db.item.findFirst({
    where: {
      ...params,
      organizationId,
    },
  });
  if (!item?.id) throw new ApiError("Item with this slug/id doesnt exist");

  return {
    success: true,
    message: "Item details fetched successfully",
    data: item,
  };
};

export const searchItemsService = async (
  organizationId: string,
  params: Static<typeof searchItemsQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const searchTerm = params.search.toLowerCase();

  const allItems = await db.item.findMany({
    where: {
      organizationId,
    },
  });

  const filteredItems = allItems.filter((item) => {
    const name = item.name as PrismaJson.LocalString;
    const description = item.description as PrismaJson.LocalString | null;

    return (
      name.en?.toLowerCase().includes(searchTerm) ||
      name.ar?.toLowerCase().includes(searchTerm) ||
      name.ku?.toLowerCase().includes(searchTerm) ||
      name.tr?.toLowerCase().includes(searchTerm) ||
      description?.en?.toLowerCase().includes(searchTerm) ||
      description?.ar?.toLowerCase().includes(searchTerm) ||
      description?.ku?.toLowerCase().includes(searchTerm) ||
      description?.tr?.toLowerCase().includes(searchTerm)
    );
  });

  const total = filteredItems.length;
  const items = filteredItems.slice(skip, skip + limit);
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Items searched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      items,
    },
  };
};
