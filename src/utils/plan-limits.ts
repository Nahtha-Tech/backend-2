import { Decimal } from "@prisma/client/runtime/library";
import db from "./db";
import ApiError from "./global-error";

export const checkPlanLimit = async (
  organizationId: string,
  resource: "categories" | "items" | "staff"
) => {
  const subscription = await db.subscription.findUnique({
    where: { organizationId },
    include: { plan: true },
  });

  if (!subscription) throw new ApiError("Organization has no subscription");

  let currentCount = 0;
  let limit = 0;
  let resourceName = "";

  switch (resource) {
    case "categories":
      currentCount = await db.category.count({
        where: { organizationId },
      });
      limit = subscription.plan.maxCategories;
      resourceName = "categories";
      break;

    case "items":
      currentCount = await db.item.count({
        where: { organizationId },
      });
      limit = subscription.plan.maxItems;
      resourceName = "items";
      break;

    case "staff":
      currentCount = await db.user.count({
        where: { organizationId },
      });
      limit = subscription.plan.maxStaff;
      resourceName = "staff";
      break;
  }

  if (currentCount >= limit) {
    throw new ApiError(
      `Plan limit reached. Your plan allows ${limit} ${resourceName}. Upgrade to add more.`
    );
  }

  return true;
};
