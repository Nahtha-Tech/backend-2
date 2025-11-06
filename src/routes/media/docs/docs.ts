import { DocumentDecoration } from "elysia";

export const uploadMediaDoc: DocumentDecoration = {
  summary: "Upload media file",
  description: "Upload and optimize image file",
  operationId: "uploadMedia",
};

export const deleteMediaDoc: DocumentDecoration = {
  summary: "Delete media file",
  description: "Delete media file from storage and database",
  operationId: "deleteMedia",
};