import db from "@src/utils/db";
import { Static } from "elysia";
import { createUserBody, updateUserBody } from "./schemas/request-body";
import ApiError from "@src/utils/global-error";
import {
  adminDeleteUserQueryParams,
  adminListUsersQueryParamsSchema,
  userSelectQueryParams,
} from "./schemas/query-params";

export const adminListAllUsersService = async (
  params: Static<typeof adminListUsersQueryParamsSchema>,
) => {
  const users = await db.user.findMany({
    where: {
      id: params.id,
      email: params.email,
      role: params.role,
      name: params.name
        ? {
            contains: params.name,
            mode: "insensitive",
          }
        : undefined,
    },
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

  return {
    success: true,
    message: "All users listed successfully",
    data: users,
  };
};

export const adminCreateUserService = async (
  body: Static<typeof createUserBody>,
) => {
  const check = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (check?.id) throw new ApiError("User with this email already exists");

  const newUser = await db.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await Bun.password.hash(body.password),
      avatarUrl: body.avatarUrl || null,
      role: body.role || "User",
    },
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

  if (!newUser?.id)
    throw new ApiError("Issue happened while trying to add this user.");

  return {
    success: true,
    message: "Created new user successfully",
    data: newUser,
  };
};

export const adminUpdateUserService = async (
  params: Static<typeof userSelectQueryParams>,
  body: Static<typeof updateUserBody>,
) => {
  const user = await db.user.findFirst({
    where: {
      email: params.email,
      id: params.id,
    },
  });

  if (!user?.id) throw new ApiError("User with this email/id doesnt exist.");

  if (body.email) {
    const existingEmailUser = await db.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingEmailUser && existingEmailUser.id !== user.id) {
      throw new ApiError("User with this email already exists");
    }
  }

  const updateData: any = { ...body };
  if (body.password) {
    updateData.password = await Bun.password.hash(body.password);
  }

  const updating = await db.user.update({
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

  if (!updating?.id)
    throw new ApiError("Issue happened while trying to update user.");

  return {
    success: true,
    message: "User updated successfully.",
    data: updating,
  };
};

export const adminDeleteUserService = async (
  params: Static<typeof adminDeleteUserQueryParams>,
) => {
  const user = await db.user.findFirst({
    where: {
      id: params.id,
    },
  });
  if (!user?.id) throw new ApiError("User with this id doesnt exist.");

  const deleting = await db.user.delete({
    where: { id: user.id },
  });
  if (!deleting?.id)
    throw new ApiError("Issue happened while trying to delete user.");

  return {
    success: true,
    message: "User deleted successfully.",
    data: null,
  };
};

export const adminShowUserService = async (
  params: Static<typeof userSelectQueryParams>,
) => {
  if (!params.id && !params.email)
    throw new ApiError("please provide id or email of the user.");

  const user = await db.user.findFirst({
    where: {
      email: params.email,
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      avatarUrl: true,
    },
  });
  if (!user?.id) throw new ApiError("User with this email/id doesnt exist.");

  return {
    success: true,
    message: "User details fetched successfully.",
    data: user,
  };
};

export const adminListUserBranchesService = async (
  params: Static<typeof userSelectQueryParams>,
) => {
  const user = await db.user.findFirst({
    where: {
      email: params.email,
      id: params.id,
    },
  });
  if (!user?.id) throw new ApiError("User ith this email/id doesnt wexist.");

  const memberships = await db.branchMembership.findMany({
    where: {
      userId: user.id,
    },
    include: {
      branch: {
        include: {
          organization: true,
        },
      },
    },
  });

  if (!memberships)
    throw new ApiError(
      "Error happened while trying to fetch branches for this user.",
    );

  return {
    success: true,
    message: "User branches listed successfully.",
    data: memberships.map((m) => m.branch),
  };
};
