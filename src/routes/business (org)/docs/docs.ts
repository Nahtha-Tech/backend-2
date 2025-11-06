import { DocumentDecoration } from "elysia";

export const getOrgDocs: DocumentDecoration = {
  summary: "Get organization details",
  description: "Get current organization information",
  operationId: "getOrg",
};

export const updateOrgDocs: DocumentDecoration = {
  summary: "Update organization",
  description: "Update current organization details",
  operationId: "updateOrg",
};

export const getMenuStructureDocs: DocumentDecoration = {
  summary: "Get menu structure",
  description: "Get the menu structure with optional category and item details",
  operationId: "getMenuStructure",
};

export const updateMenuStructureDocs: DocumentDecoration = {
  summary: "Update menu structure",
  description:
    "Update the complete menu structure including ordering of categories and items",
  operationId: "updateMenuStructure",
};

export const businessOrgListPaymentsDocs: DocumentDecoration = {
  summary: "List payments",
  description: "Get payment history for current organization",
  operationId: "listOrgPayments",
};
