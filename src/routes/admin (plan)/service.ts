import db from "@/src/utils/db";
import { Static } from "elysia";
import {
  createPlanBodySchema,
  updatePlanBodySchema,
} from "./schemas/request-body";
import ApiError from "@/src/utils/global-error";
import {
  adminDeletePlanQueryParamsSchema,
  adminListPlansQueryParamsSchema,
  planSelectQueryParamsSchema,
} from "./schemas/query-params";

export const adminListAllPlansService = async (
  params: Static<typeof adminListPlansQueryParamsSchema>
) => {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  const where = {
    id: params.id,
  };

  const [plans, total] = await Promise.all([
    db.plan.findMany({
      where,
      skip,
      take: limit,
    }),
    db.plan.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: "All plans listed successfully",
    data: {
      total,
      page,
      limit,
      totalPages,
      plans,
    },
  };
};

export const adminCreatePlanService = async (
  body: Static<typeof createPlanBodySchema>
) => {
  const newPlan = await db.plan.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      durationInDays: body.durationInDays,
      maxCategories: body.maxCategories,
      maxItems: body.maxItems,
      maxStaff: body.maxStaff,
      maxMedia: body.maxMedia,
      isActive: body.isActive !== false,
    },
  });

  if (!newPlan?.id)
    throw new ApiError("Issue happened while trying to add this plan");

  return {
    success: true,
    message: "Created new plan successfully",
    data: newPlan,
  };
};

export const adminUpdatePlanService = async (
  params: Static<typeof planSelectQueryParamsSchema>,
  body: Static<typeof updatePlanBodySchema>
) => {
  const plan = await db.plan.findUnique({
    where: { id: params.id },
  });

  if (!plan?.id) throw new ApiError("Plan with this id doesnt exist");

  const updateData: any = {};
  if (body.name) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.price !== undefined) updateData.price = body.price;
  if (body.durationInDays !== undefined)
    updateData.durationInDays = body.durationInDays;
  if (body.maxCategories !== undefined)
    updateData.maxCategories = body.maxCategories;
  if (body.maxItems !== undefined) updateData.maxItems = body.maxItems;
  if (body.maxStaff !== undefined) updateData.maxStaff = body.maxStaff;
  if (body.maxMedia !== undefined) updateData.maxMedia = body.maxMedia;
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const updating = await db.plan.update({
    where: { id: plan.id },
    data: updateData,
  });

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update plan");

  return {
    success: true,
    message: "Plan updated successfully",
    data: updating,
  };
};

export const adminDeletePlanService = async (
  params: Static<typeof adminDeletePlanQueryParamsSchema>
) => {
  const plan = await db.plan.findUnique({
    where: { id: params.id },
  });

  if (!plan?.id) throw new ApiError("Plan with this id doesnt exist");

  const deleting = await db.plan.delete({
    where: { id: plan.id },
  });

  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete plan");

  return {
    success: true,
    message: "Plan deleted successfully",
    data: null,
  };
};

export const adminShowPlanService = async (
  params: Static<typeof planSelectQueryParamsSchema>
) => {
  if (!params.id) throw new ApiError("Please provide id of the plan");

  const plan = await db.plan.findUnique({
    where: { id: params.id },
  });

  if (!plan?.id) throw new ApiError("Plan with this id doesnt exist");

  return {
    success: true,
    message: "Plan details fetched successfully",
    data: plan,
  };
};
