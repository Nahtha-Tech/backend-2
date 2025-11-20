import { DocumentDecoration } from "elysia";

export const getPublicOrgDocs: DocumentDecoration = {
  summary: "Get public organization details",
  description: "Get public organization information by slug",
  operationId: "getPublicOrg",
};

export const getPublicCategoriesDocs: DocumentDecoration = {
  summary: "Get public categories",
  description: "Get all categories for an organization",
  operationId: "getPublicCategories",
};

export const getPublicItemsDocs: DocumentDecoration = {
  summary: "Get public items",
  description: "Get all items for an organization",
  operationId: "getPublicItems",
};

export const getPublicItemDetailsDocs: DocumentDecoration = {
  summary: "Get public item details",
  description: "Get detailed information about a specific item",
  operationId: "getPublicItemDetails",
};

export const getPublicMenuStructureDocs: DocumentDecoration = {
  summary: "Get public menu structure",
  description:
    "Get the menu structure with optional category and item details",
  operationId: "getPublicMenuStructure",
};

export const searchPublicItemsDocs: DocumentDecoration = {
  summary: "Search public items",
  description: "Search items by name across all languages",
  operationId: "searchPublicItems",
};