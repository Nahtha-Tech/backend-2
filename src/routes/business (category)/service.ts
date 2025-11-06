import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  createCategoryBodySchema,
  updateCategoryBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import {
  categorySelectQueryParamsSchema,
  listCategoriesQueryParamsSchema,
  searchCategoriesQueryParamsSchema,
} from "./schemas/query-params";

export const listCategoriesService = async (
  organizationId: string,
  params: Static<typeof listCategoriesQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    organizationId,
  };

  const [categories, total] = await Promise.all([
    db.category.findMany({
      where,
      skip,
      take: limit,
    }),
    db.category.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "All categories listed successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      categories,
    },
  };
};

export const createCategoryService = async (
  organizationId: string,
  body: Static<typeof createCategoryBodySchema>
) => {
  const check = await db.category.findUnique({
    where: {
      slug: body.slug,
    },
  });
  if (check?.id) throw new ApiError("Category with this slug already exists");

  const newCategory = await db.category.create({
    data: {
      name: body.name,
      slug: body.slug,
      imageUrl: body.imageUrl,
      organizationId,
    },
  });

  if (!newCategory?.id)
    throw new ApiError("Issue happened while trying to add this category");

  return {
    success: true,
    message: "Created new category successfully",
    data: newCategory,
  };
};

export const updateCategoryService = async (
  organizationId: string,
  params: Static<typeof categorySelectQueryParamsSchema>,
  body: Static<typeof updateCategoryBodySchema>
) => {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
      organizationId,
    },
  });

  if (!category?.id)
    throw new ApiError("Category with this slug/id doesnt exist");

  if (body.slug) {
    const existingSlugCategory = await db.category.findUnique({
      where: {
        slug: body.slug,
      },
    });

    if (existingSlugCategory && existingSlugCategory.id !== category.id) {
      throw new ApiError("Category with this slug already exists");
    }
  }

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.slug) updateData.slug = body.slug;
  if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;

  const updating = await db.category.update({
    where: { id: category.id },
    data: updateData,
  });

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update category");

  return {
    success: true,
    message: "Category updated successfully",
    data: updating,
  };
};

export const deleteCategoryService = async (
  organizationId: string,
  params: Static<typeof categorySelectQueryParamsSchema>
) => {
  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
      organizationId,
    },
  });
  if (!category?.id)
    throw new ApiError("Category with this slug/id doesnt exist");

  const deleting = await db.category.delete({
    where: { id: category.id },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete category");

  return {
    success: true,
    message: "Category deleted successfully",
    data: null,
  };
};

export const showCategoryService = async (
  organizationId: string,
  params: Static<typeof categorySelectQueryParamsSchema>
) => {
  if (!params.id && !params.slug)
    throw new ApiError("Please provide id or slug of the category");

  const category = await db.category.findFirst({
    where: {
      slug: params.slug,
      id: params.id,
      organizationId,
    },
  });
  if (!category?.id)
    throw new ApiError("Category with this slug/id doesnt exist");

  return {
    success: true,
    message: "Category details fetched successfully",
    data: category,
  };
};

export const searchCategoriesService = async (
  organizationId: string,
  params: Static<typeof searchCategoriesQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const searchTerm = params.search.toLowerCase();

  const allCategories = await db.category.findMany({
    where: {
      organizationId,
    },
  });

  const filteredCategories = allCategories.filter((category) => {
    const name = category.name as PrismaJson.LocalString;
    return (
      name.en?.toLowerCase().includes(searchTerm) ||
      name.ar?.toLowerCase().includes(searchTerm) ||
      name.ku?.toLowerCase().includes(searchTerm) ||
      name.tr?.toLowerCase().includes(searchTerm)
    );
  });

  const total = filteredCategories.length;
  const categories = filteredCategories.slice(skip, skip + limit);
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Categories searched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      categories,
    },
  };
};
