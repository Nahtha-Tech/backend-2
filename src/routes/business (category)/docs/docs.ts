import { DocumentDecoration } from "elysia";

export const listCategoriesDocs: DocumentDecoration = {
  summary: "List categories",
  description: "List all categories for the organization",
  operationId: "listCategories",
};

export const createCategoryDocs: DocumentDecoration = {
  summary: "Add category",
  description: "Add new category",
  operationId: "addCategory",
};

export const updateCategoryDocs: DocumentDecoration = {
  summary: "Update category",
  description: "Update category details",
  operationId: "updateCategory",
};

export const deleteCategoryDocs: DocumentDecoration = {
  summary: "Delete category",
  description: "Delete category",
  operationId: "deleteCategory",
};
