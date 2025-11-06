import { Static } from "elysia";
import {
  signinBodySchema,
  signupBodySchema,
  updateProfileBodySchema,
} from "./schemas/request-body";
import db from "@/src/utils/db";
import ApiError from "@/src/utils/global-error";
import { Cookie } from "elysia/dist/cookies";
import { User } from "@prisma/client";
import { sendPasswordResetEmail } from "@/src/utils/email";

export const signupService = async (data: Static<typeof signupBodySchema>) => {
  const { email, name, password, avatarUrl } = data;

  const user = await db.user.findUnique({
    where: { email },
  });
  if (user?.id) throw new ApiError("User Already Exists");

  const newUser = await db.user.create({
    data: {
      email,
      name,
      password: await Bun.password.hash(password),
      avatarUrl: avatarUrl || null,
    },
  });
  if (!newUser.id) throw new ApiError("Error while creating new user");

  return {
    success: true,
    message: "user created successfuly",
    data: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      avatarUrl: newUser.avatarUrl,
      role: newUser.role,
    },
  };
};

export const signinService = async (data: Static<typeof signinBodySchema>) => {
  const { email, password } = data;

  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user?.id) throw new ApiError("Invalid credentials");

  const verifyPassword = await Bun.password.verify(password, user.password);
  if (!verifyPassword) throw new ApiError("Invalid credentials");

  return {
    success: true,
    message: "Signed in successfully",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
    },
  };
};

export const meService = async (user: User | undefined) => {
  if (!user?.id) throw new ApiError("User Doesnt Exists, Unautherized call");

  return {
    success: true,
    message: "user details fetched successfully",
    data: user,
  };
};

export const signoutService = async (
  accessToken: Cookie<unknown>,
  refreshToken: Cookie<unknown>
) => {
  accessToken.remove();
  refreshToken.remove();
  return {
    success: true,
    message: "Signed out successfully",
    data: null,
  };
};

export const refreshTokensService = async () => {
  return {
    success: true,
    message: "Refreshed tokens successfully.",
    data: null,
  };
};

export const authcheckIfUserExistsService = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user?.id)
    throw new ApiError("User with this email address doesn't exist.");

  return user;
};

export const forgotPasswordService = async (
  email: string,
  resetToken: string
) => {
  await sendPasswordResetEmail(email, resetToken);

  return {
    success: true,
    message: "Password reset email sent successfully.",
    data: null,
  };
};

export const resetPasswordService = async (
  userId: string,
  newPassword: string,
  ref: string
) => {
  const userCheck = await db.user.findUnique({
    where: { id: userId },
  });
  if (!userCheck?.id) throw new ApiError("User not found.");

  if (userCheck.password.substring(0, 10) !== ref)
    throw new ApiError("Token already used or invalid.");

  await db.user.update({
    where: { id: userId },
    data: {
      password: await Bun.password.hash(newPassword),
    },
  });

  return {
    success: true,
    message: "Password reset successfully.",
    data: null,
  };
};

export const updateProfileService = async (
  user: User | undefined,
  data: Static<typeof updateProfileBodySchema>
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  if (data.email && data.email !== user.email) {
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser?.id) {
      throw new ApiError("Email already in use");
    }
  }

  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.avatarUrl !== undefined)
    updateData.avatarUrl = data.avatarUrl || null;
  if (data.password) {
    updateData.password = await Bun.password.hash(data.password);
  }

  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: updateData,
  });

  if (!updatedUser?.id) {
    throw new ApiError("Failed to update profile");
  }

  return {
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  };
};
