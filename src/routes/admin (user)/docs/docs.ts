import { DocumentDecoration } from "elysia";

export const adminListUsersDoc: DocumentDecoration = {
  summary: "list users",
  description: "List all users",
  operationId: "adminListUsers",
};

export const adminCreateUserDoc: DocumentDecoration = {
  summary: "add user",
  description: "Add new user",
  operationId: "adminAddUser",
};

export const adminUpdateUserDoc: DocumentDecoration = {
  summary: "update user",
  description: "Update user details",
  operationId: "adminUpdateUser",
};

export const adminDeleteUserDoc: DocumentDecoration = {
  summary: "delete user",
  description: "Delete user and all related memberships",
  operationId: "adminDeleteUser",
};

export const adminShowUserDoc: DocumentDecoration = {
  summary: "show user",
  description: "Show user details",
  operationId: "adminShowUser",
};

export const adminListUserBranchesDoc: DocumentDecoration = {
  summary: "list user branches",
  description: "List all branches user has access to",
  operationId: "adminListUserBranches",
};