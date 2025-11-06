import { DocumentDecoration } from "elysia";

export const listItemsDocs: DocumentDecoration = {
  summary: "List items",
  description: "List all items for the organization with their variants",
  operationId: "listItems",
};

export const createItemDocs: DocumentDecoration = {
  summary: "Add item",
  description: "Add new item with optional variants",
  operationId: "addItem",
};

export const updateItemDocs: DocumentDecoration = {
  summary: "Update item",
  description: "Update item details including variants",
  operationId: "updateItem",
};

export const deleteItemDocs: DocumentDecoration = {
  summary: "Delete item",
  description: "Delete item",
  operationId: "deleteItem",
};

export const showItemDocs: DocumentDecoration = {
  summary: "Show item",
  description: "Show item details with variants",
  operationId: "showItem",
};

export const searchItemsDocs: DocumentDecoration = {
  summary: "Search items",
  description: "Search items by name across all languages",
  operationId: "searchItems",
};