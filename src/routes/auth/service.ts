// src/routes/auth/service.ts
import { Static } from "elysia";
import {
  signinBody,
  signupBody,
  switchOrgBody,
  switchBranchBody,
} from "./schemas/request-body";
import Response from "@src/utils/global-response";
import db from "@src/utils/db";
import ApiError from "@src/utils/global-error";
import { ElysiaCookie, Cookie } from "elysia/dist/cookies";
import { $Enums, User } from "@prisma/client";
import { sendPasswordResetEmail } from "@src/utils/email";
export const signup = async (data: Static<typeof signupBody>) => {
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

export const signin = async (data: Static<typeof signinBody>) => {
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

export const me = async (
  data:
    | {
        readonly selectedOrganizationSlug: string | undefined;
        readonly selectedBranchSlug: string | undefined;
        readonly name: string;
        readonly email: string;
        readonly password: string;
        readonly avatarUrl: string | null;
        readonly id: string;
        readonly role: $Enums.UserRole;
        readonly createdAt: Date;
        readonly updatedAt: Date;
      }
    | undefined,
) => {
  if (!data?.id) throw new ApiError("User Doesnt Exists, Unautherized call");

  return {
    success: true,
    message: "user details fetched successfully",
    data: {
      ...data,
      selectedOrganizationSlug: data.selectedOrganizationSlug,
      selectedBranchSlug: data.selectedBranchSlug,
    },
  };
};

export const signout = async (
  accessToken: Cookie<unknown>,
  refreshToken: Cookie<unknown>,
) => {
  accessToken.remove();
  refreshToken.remove();
  return {
    success: true,
    message: "Signed out successfully",
    data: null,
  };
};

export const refreshTokens = async () => {
  return {
    success: true,
    message: "Refreshed tokens successfully.",
    data: null,
  };
};

export const userExistsInThisOrg = async (
  user: User | undefined,
  orgSlug: string,
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // check if user has membership inside org with this slug
  const membership = await db.branchMembership.findFirst({
    where: {
      userId: user.id,
      branch: {
        organization: {
          slug: orgSlug,
        },
      },
    },
    select: {
      id: true,
    },
  });

  if (!membership?.id)
    throw new ApiError("User dont have access to this organization.");
};

export const switchOrg = async (data: Static<typeof switchOrgBody>) => {
  return {
    success: true,
    message: "Organization selected successfully.",
    data: null,
  };
};

export const userExistsInThisBranch = async (
  user: User | undefined,
  branchSlug: string,
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // check if user has membership with this branch
  const membership = await db.branchMembership.findFirst({
    where: {
      userId: user.id,
      branch: {
        slug: branchSlug,
      },
    },
    select: {
      id: true,
    },
  });
  if (!membership?.id)
    throw new ApiError("User dont have access to this branch.");
};

export const switchBranch = async (data: Static<typeof switchBranchBody>) => {
  return {
    success: true,
    message: "Branch selected successfully.",
    data: null,
  };
};

export const getBranches = async (user: User | undefined) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // get all branches that have this user inside it, then show these branches organizations, filter out duplications as well
  const membership = await db.branchMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      branch: true,
    },
  });

  const branches = membership?.map((i) => i.branch);

  return {
    success: true,
    message: "Branches listed successfully",
    data: branches,
  };
};

export const getOrgs = async (user: User | undefined) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // get all branches that have this user inside it, then show these branches organizations, filter out duplications as well
  const membership = await db.branchMembership.findMany({
    where: {
      userId: user.id,
    },
    select: {
      branch: {
        include: {
          organization: true,
        },
      },
    },
  });

  const orgs = membership?.map((i) => i.branch.organization);

  return {
    success: true,
    message: "Organizations listed successfully",
    data: orgs,
  };
};

export const authcheckIfUserExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
  });
  if (!user?.id)
    throw new ApiError("User with this email address doesn't exist.");

  return user;
};

export const forgotPassword = async (email: string, resetToken: string) => {
  await sendPasswordResetEmail(email, resetToken);

  return {
    success: true,
    message: "Password reset email sent successfully.",
    data: null,
  };
};
export const resetPassword = async (
  userId: string,
  newPassword: string,
  ref: string,
) => {
  // Check if user exists and ref matches current password hash
  const userCheck = await db.user.findUnique({
    where: { id: userId },
  });
  if (!userCheck?.id) throw new ApiError("User not found.");

  // Check if token's ref matches current password (if not, password was already changed)
  if (userCheck.password.substring(0, 10) !== ref)
    throw new ApiError("Token already used or invalid.");

  // Update password - this will invalidate the token
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

export const updateProfile = async (
  user: User | undefined,
  data: Static<typeof updateProfileBody>,
) => {
  if (!user) throw new ApiError("User Doesnt Exists, Unautherized call");

  // Check if email is being updated and if it already exists
  if (data.email && data.email !== user.email) {
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser?.id) {
      throw new ApiError("Email already in use");
    }
  }

  // Prepare update data
  const updateData: any = {};
  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
  if (data.avatarUrl !== undefined)
    updateData.avatarUrl = data.avatarUrl || null;
  if (data.phone !== undefined) updateData.phone = data.phone || null;
  if (data.password) {
    updateData.password = await Bun.password.hash(data.password);
  }

  // Update user
  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
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
