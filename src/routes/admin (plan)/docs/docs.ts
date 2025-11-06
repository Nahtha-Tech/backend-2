import { DocumentDecoration } from "elysia";

export const adminListPlansDocs: DocumentDecoration = {
  summary: "List plans",
  description: "List all plans with pagination",
  operationId: "adminListPlans",
};

export const adminCreatePlanDocs: DocumentDecoration = {
  summary: "Add plan",
  description: "Add new plan",
  operationId: "adminAddPlan",
};

export const adminUpdatePlanDocs: DocumentDecoration = {
  summary: "Update plan",
  description: "Update plan details",
  operationId: "adminUpdatePlan",
};

export const adminDeletePlanDocs: DocumentDecoration = {
  summary: "Delete plan",
  description: "Delete plan",
  operationId: "adminDeletePlan",
};

export const adminShowPlanDocs: DocumentDecoration = {
  summary: "Show plan",
  description: "Show plan details",
  operationId: "adminShowPlan",
};