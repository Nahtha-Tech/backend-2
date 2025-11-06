import { DocumentDecoration } from "elysia";

export const signinDoc: DocumentDecoration = {
  summary: "Sign in user",
  description: "Authenticate user with email and password and issue tokens",
  operationId: "signIn",
};

export const signupDoc: DocumentDecoration = {
  summary: "Sign up user",
  description: "Register a new user account and return success response",
  operationId: "signUp",
};

export const signoutDoc: DocumentDecoration = {
  summary: "Sign out user",
  description: "Invalidate refresh and access tokens for the current session",
  operationId: "signOut",
};

export const refreshDoc: DocumentDecoration = {
  summary: "Refresh tokens",
  description:
    "Generate new access and refresh tokens using valid refresh token",
  operationId: "refreshTokens",
};

export const forgotPasswordDoc: DocumentDecoration = {
  summary: "Forgot password",
  description: "Sends Email to reset users password.",
  operationId: "forgotPassword",
};

export const resetPasswordDoc: DocumentDecoration = {
  summary: "Reset Password",
  description: "Resets user password if aligable.",
  operationId: "resetPassword",
};

export const meDoc: DocumentDecoration = {
  summary: "Get current user info",
  description: "Return details of the authenticated user",
  operationId: "getCurrentUser",
};

export const updateProfileDoc: DocumentDecoration = {
  summary: "Update profile",
  description: "Update current user's profile information",
  operationId: "updateMyProfile",
};
