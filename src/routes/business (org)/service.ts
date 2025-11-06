import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  updateMenuStructureBodySchema,
  updateOrgBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import { getMenuStructureQueryParamsSchema, listPaymentsQueryParamsSchema } from "./schemas/query-params";

export const getOrgService = async (organizationId: string) => {
  const org = await db.organization.findUnique({
    where: { id: organizationId },
    include: { plan: true },
  });

  if (!org) throw new ApiError("Organization not found");

  return {
    success: true,
    message: "Organization details fetched successfully",
    data: org,
  };
};

export const updateOrgService = async (
  organizationId: string,
  body: Static<typeof updateOrgBodySchema>
) => {
  const org = await db.organization.findUnique({
    where: { id: organizationId },
  });

  if (!org) throw new ApiError("Organization not found");

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;
  if (body.email !== undefined) updateData.email = body.email;
  if (body.googleMapsLink !== undefined)
    updateData.googleMapsLink = body.googleMapsLink;
  if (body.socialMedia !== undefined) updateData.socialMedia = body.socialMedia;
  if (body.logoImgUrl !== undefined) updateData.logoImgUrl = body.logoImgUrl;

  const updated = await db.organization.update({
    where: { id: organizationId },
    data: updateData,
    include: { plan: true },
  });

  if (!updated) throw new ApiError("Failed to update organization");

  return {
    success: true,
    message: "Organization updated successfully",
    data: updated,
  };
};

export const getMenuStructureService = async (
  organizationId: string,
  params: Static<typeof getMenuStructureQueryParamsSchema>
) => {
  const org = await db.organization.findUnique({
    where: { id: organizationId },
    select: { menuStructure: true },
  });

  if (!org) throw new ApiError("Organization not found");

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
      where: { id: { in: categoryIds }, organizationId },
    }),
    db.item.findMany({
      where: { id: { in: itemIds }, organizationId },
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

export const updateMenuStructureService = async (
  organizationId: string,
  body: Static<typeof updateMenuStructureBodySchema>
) => {
  const org = await db.organization.findUnique({
    where: { id: organizationId },
  });

  if (!org) throw new ApiError("Organization not found");

  const categoryIds = body.menuStructure
    .filter((node) => node.type === "category")
    .map((node) => node.id);

  const uniqueCategoryIds = [...new Set(categoryIds)];

  const categories = await db.category.findMany({
    where: { id: { in: uniqueCategoryIds }, organizationId },
    select: { id: true },
  });

  if (categories.length !== uniqueCategoryIds.length) {
    throw new ApiError(
      "Some categories do not exist or do not belong to this organization"
    );
  }

  const itemIds = body.menuStructure
    .flatMap((node) => node.children || [])
    .filter((child) => child.type === "item")
    .map((child) => child.id);

  const uniqueItemIds = [...new Set(itemIds)];

  const items = await db.item.findMany({
    where: { id: { in: uniqueItemIds }, organizationId },
    select: { id: true },
  });

  if (items.length !== uniqueItemIds.length) {
    throw new ApiError(
      "Some items do not exist or do not belong to this organization"
    );
  }

  const updated = await db.organization.update({
    where: { id: organizationId },
    data: {
      menuStructure: body.menuStructure as any,
    },
    select: { menuStructure: true },
  });

  return {
    success: true,
    message: "Menu structure updated successfully",
    data: updated.menuStructure,
  };
};

export const listPaymentsService = async (
  organizationId: string,
  params: Static<typeof listPaymentsQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    organizationId,
    ...(params.isPaid !== undefined && { isPaid: params.isPaid }),
  };

  const [payments, total] = await Promise.all([
    db.payment.findMany({
      where,
      select: {
        id: true,
        amount: true,
        paidAt: true,
        periodStart: true,
        periodEnd: true,
        notes: true,
        waylStatus: true,
        isPaid: true,
        createdAt: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    db.payment.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "Payment history fetched successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      payments,
    },
  };
};
