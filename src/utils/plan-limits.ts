// src/utils/plan-limits.ts
import { Decimal } from "@prisma/client/runtime/library";
import db from "./db";
import ApiError from "./global-error";
import { $Enums, Organization, Plan } from "@prisma/client";

export const checkPlanLimit = async (
  organization:
    | ({
        plan: {
          description: PrismaJson.LocalString | null;
          id: string;
          name: PrismaJson.LocalString;
          createdAt: Date;
          updatedAt: Date;
          price: Decimal;
          maxBranches: number;
          maxMenus: number;
          maxCategories: number;
          maxItems: number;
          maxStaff: number;
          isActive: boolean;
        };
      } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        planId: string;
        subscriptionStatus: $Enums.SubscriptionStatus;
        subscriptionEndsAt: Date | null;
      })
    | undefined,
  resource: "menus" | "categories" | "items" | "branches" | "staff",
) => {
  if (!organization) throw new ApiError("Organization not found");

  let currentCount = 0;
  let limit = 0;
  let resourceName = "";

  switch (resource) {
    case "menus":
      currentCount = await db.menu.count({
        where: { Branch: { organizationId: organization.id } },
      });
      limit = organization.plan.maxMenus;
      resourceName = "menus";
      break;

    case "categories":
      currentCount = await db.category.count({
        where: { Branch: { organizationId: organization.id } },
      });
      limit = organization.plan.maxCategories;
      resourceName = "categories";
      break;

    case "items":
      currentCount = await db.item.count({
        where: { Branch: { organizationId: organization.id } },
      });
      limit = organization.plan.maxItems;
      resourceName = "items";
      break;

    case "branches":
      currentCount = await db.branch.count({
        where: { organizationId: organization.id },
      });
      limit = organization.plan.maxBranches;
      resourceName = "branches";
      break;
  }

  if (currentCount >= limit) {
    throw new ApiError(
      `Plan limit reached. Your plan allows ${limit} ${resourceName}. Upgrade to add more.`,
    );
  }
  

  return true;
};
