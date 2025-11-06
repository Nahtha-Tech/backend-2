import { DocumentDecoration } from "elysia";

export const adminListOrgsDocs: DocumentDecoration = {
  summary: "List organizations",
  description: "List all organizations with pagination",
  operationId: "adminListOrgs",
};

export const adminCreateOrgDocs: DocumentDecoration = {
  summary: "Add organization",
  description: "Add new organization",
  operationId: "adminAddOrg",
};

export const adminUpdateOrgDocs: DocumentDecoration = {
  summary: "Update organization",
  description: "Update organization details",
  operationId: "adminUpdateOrg",
};

export const adminDeleteOrgDocs: DocumentDecoration = {
  summary: "Delete organization",
  description: "Delete organization",
  operationId: "adminDeleteOrg",
};

export const adminShowOrgDocs: DocumentDecoration = {
  summary: "Show organization",
  description: "Show organization details",
  operationId: "adminShowOrg",
};

export const adminListOrgPaymentsDocs: DocumentDecoration = {
  summary: "List organization payments",
  description: "Get payment history for an organization",
  operationId: "adminListOrgPayments",
};
