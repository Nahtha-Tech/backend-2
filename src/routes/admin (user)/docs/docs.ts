import { DocumentDecoration } from "elysia";

export const adminListUsersDocs: DocumentDecoration = {
  summary: "List users",
  description: "List all users with pagination",
  operationId: "adminListUsers",
};

export const adminCreateUserDocs: DocumentDecoration = {
  summary: "Add user",
  description: "Add new user",
  operationId: "adminAddUser",
};

export const adminUpdateUserDocs: DocumentDecoration = {
  summary: "Update user",
  description: "Update user details",
  operationId: "adminUpdateUser",
};

export const adminDeleteUserDocs: DocumentDecoration = {
  summary: "Delete user",
  description: "Delete user",
  operationId: "adminDeleteUser",
};

export const adminShowUserDocs: DocumentDecoration = {
  summary: "Show user",
  description: "Show user details",
  operationId: "adminShowUser",
};