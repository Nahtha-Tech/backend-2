import { DocumentDecoration } from "elysia";

export const signinDocs: DocumentDecoration = {
  summary: "Sign in user",
  description: "Authenticate user with email and password and issue tokens",
  operationId: "signIn",
};

export const signupDocs: DocumentDecoration = {
  summary: "Sign up user",
  description: "Register a new user account and return success response",
  operationId: "signUp",
};

export const signoutDocs: DocumentDecoration = {
  summary: "Sign out user",
  description: "Invalidate refresh and access tokens for the current session",
  operationId: "signOut",
};

export const refreshDocs: DocumentDecoration = {
  summary: "Refresh tokens",
  description:
    "Generate new access and refresh tokens using valid refresh token",
  operationId: "refreshTokens",
};

export const forgotPasswordDocs: DocumentDecoration = {
  summary: "Forgot password",
  description: "Sends Email to reset users password.",
  operationId: "forgotPassword",
};

export const resetPasswordDocs: DocumentDecoration = {
  summary: "Reset Password",
  description: "Resets user password if aligable.",
  operationId: "resetPassword",
};

export const meDocs: DocumentDecoration = {
  summary: "Get current user info",
  description: "Return details of the authenticated user",
  operationId: "getCurrentUser",
};

export const updateProfileDocs: DocumentDecoration = {
  summary: "Update profile",
  description: "Update current user's profile information",
  operationId: "updateMyProfile",
};
