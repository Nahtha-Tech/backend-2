import db from "@/src/utils/db";
import { Static } from "elysia";
import ApiError from "@/src/utils/global-error";
import {
  publicCategoriesQueryParamsSchema,
  publicItemDetailsQueryParamsSchema,
  publicItemsQueryParamsSchema,
  publicMenuStructureQueryParamsSchema,
  publicOrgQueryParamsSchema,
  publicSearchItemsQueryParamsSchema,
} from "./schemas/query-params";

const verifyActiveOrganization = async (slug: string) => {
  const org = await db.organization.findUnique({
    where: { slug },
    include: {
      subscription: true,
    },
  });

  if (!org) throw new ApiError("Organization not found", 404);

  if (!org.subscription || org.subscription.status !== "Active") {
    throw new ApiError("Organization is not available", 403);
  }

  return org;
};

export const getPublicOrgService = async (
  params: Static<typeof publicOrgQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.slug);

  return {
    success: true,
    message: "Organization details fetched successfully",
    data: {
      name: org.name,
      description: org.description,
      phoneNumber: org.phoneNumber,
      email: org.email,
      googleMapsLink: org.googleMapsLink,
      socialMedia: org.socialMedia,
      slug: org.slug,
      logoImgUrl: org.logoImgUrl,
    },
  };
};

export const getPublicCategoriesService = async (
  params: Static<typeof publicCategoriesQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.slug);

  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    organizationId: org.id,
  };

  const [categories, total] = await Promise.all([
    db.category.findMany({
      where,
      select: {
        id: true,
        slug: true,
        name: true,
        imageUrl: true,
      },
      skip,
      take: limit,
    }),
    db.category.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Categories fetched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      categories,
    },
  };
};

export const getPublicItemsService = async (
  params: Static<typeof publicItemsQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.slug);

  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    organizationId: org.id,
    ...(params.categoryId && { categoryId: params.categoryId }),
  };

  const [items, total] = await Promise.all([
    db.item.findMany({
      where,
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        imageUrl: true,
        basePrice: true,
        variantGroups: true,
      },
      skip,
      take: limit,
    }),
    db.item.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Items fetched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      items,
    },
  };
};

export const getPublicItemDetailsService = async (
  params: Static<typeof publicItemDetailsQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.orgSlug);

  const item = await db.item.findFirst({
    where: {
      slug: params.itemSlug,
      organizationId: org.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      basePrice: true,
      variantGroups: true,
    },
  });

  if (!item) throw new ApiError("Item not found", 404);

  return {
    success: true,
    message: "Item details fetched successfully",
    data: item,
  };
};

export const getPublicMenuStructureService = async (
  params: Static<typeof publicMenuStructureQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.slug);

  const menuStructure = org.menuStructure as menuStructure;

  if (!params.includeData) {
    return {
      success: true,
      message: "Menu structure fetched successfully",
      data: menuStructure,
    };
  }

  const categoryIds = menuStructure
    .filter((node) => node.type === "category")
    .map((node) => node.id);

  const itemIds = menuStructure
    .flatMap((node) => node.children || [])
    .filter((child) => child.type === "item")
    .map((child) => child.id);

  const [categories, items] = await Promise.all([
    db.category.findMany({
      where: { id: { in: categoryIds }, organizationId: org.id },
      select: {
        id: true,
        slug: true,
        name: true,
        imageUrl: true,
      },
    }),
    db.item.findMany({
      where: { id: { in: itemIds }, organizationId: org.id },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        imageUrl: true,
        basePrice: true,
        variantGroups: true,
      },
    }),
  ]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));

  const populatedStructure = menuStructure.map((node) => ({
    ...node,
    data: node.type === "category" ? categoryMap[node.id] || null : null,
    children: node.children?.map((child) => ({
      ...child,
      data: child.type === "item" ? itemMap[child.id] || null : null,
    })),
  }));

  return {
    success: true,
    message: "Menu structure with details fetched successfully",
    data: populatedStructure,
  };
};

export const searchPublicItemsService = async (
  params: Static<typeof publicSearchItemsQueryParamsSchema>
) => {
  const org = await verifyActiveOrganization(params.slug);

  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const searchTerm = params.search.toLowerCase();

  const allItems = await db.item.findMany({
    where: {
      organizationId: org.id,
    },
    select: {
      id: true,
      slug: true,
      name: true,
      description: true,
      imageUrl: true,
      basePrice: true,
      variantGroups: true,
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