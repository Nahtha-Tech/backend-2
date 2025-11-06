import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  updateMenuStructureBodySchema,
  updateOrgBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import { getMenuStructureQueryParamsSchema } from "./schemas/query-params";

export const getOrgService = async (organizationId: string) => {
  const org = await db.organization.findUnique({
    where: { id: organizationId },
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

  // Extract all IDs
  const categoryIds = menuStructure
    .filter((node) => node.type === "category")
    .map((node) => node.id);

  const itemIds = menuStructure
    .flatMap((node) => node.children || [])
    .filter((child) => child.type === "item")
    .map((child) => child.id);

  // Fetch in parallel
  const [categories, items] = await Promise.all([
    db.category.findMany({
      where: { id: { in: categoryIds }, organizationId },
    }),
    db.item.findMany({
      where: { id: { in: itemIds }, organizationId },
    }),
  ]);

  // Map for quick lookup
  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));
  const itemMap = Object.fromEntries(items.map((i) => [i.id, i]));

  // Populate structure
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
  const categoryIds = new Set<string>();
  const itemIds = new Set<string>();

  const validateStructure = (nodes: any[]): void => {
    for (const node of nodes) {
      if (node.type === "category") {
        categoryIds.add(node.id);
      } else if (node.type === "item") {
        itemIds.add(node.id);
      }
      if (node.children) {
        validateStructure(node.children);
      }
    }
  };

  validateStructure(body.menuStructure);

  const [categories, items] = await Promise.all([
    db.category.findMany({
      where: {
        id: { in: Array.from(categoryIds) },
        organizationId,
      },
      select: { id: true },
    }),
    db.item.findMany({
      where: {
        id: { in: Array.from(itemIds) },
        organizationId,
      },
      select: { id: true },
    }),
  ]);

  if (categories.length !== categoryIds.size) {
    throw new ApiError(
      "Some categories do not exist or don't belong to this organization"
    );
  }

  if (items.length !== itemIds.size) {
    throw new ApiError(
      "Some items do not exist or don't belong to this organization"
    );
  }

  const updated = await db.organization.update({
    where: { id: organizationId },
    data: { menuStructure: body.menuStructure as any },
    select: { menuStructure: true },
  });

  return {
    success: true,
    message: "Menu structure updated successfully",
    data: updated.menuStructure as menuStructure,
  };
};
