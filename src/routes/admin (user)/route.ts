import Elysia from "elysia";
import { createUserBody, updateUserBody } from "./schemas/request-body";
import {
  adminDeleteUserQueryParams,
  adminListUsersQueryParamsSchema,
  userSelectQueryParams,
} from "./schemas/query-params";
import {
  adminCreateUserDoc,
  adminDeleteUserDoc,
  adminListUserBranchesDoc,
  adminListUsersDoc,
  adminShowUserDoc,
  adminUpdateUserDoc,
} from "./docs/docs";
import Response from "@src/utils/global-response";
import {
  adminCreateUserResponse,
  adminDeleteUserResponse,
  adminListUserBranchesResponse,
  adminListUsersResponse,
  adminShowUserResponse,
  adminUpdateUserResponse,
} from "./schemas/response";
import { adminCheckPlugin } from "@src/plugins/auth-plugin";
import {
  adminCreateUserService,
  adminDeleteUserService,
  adminListAllUsersService,
  adminListUserBranchesService,
  adminShowUserService,
  adminUpdateUserService,
} from "./service";

export const adminUserRoutes = new Elysia({
  prefix: "/admin/user",
  tags: ["admin (User)"],
})
  .use(adminCheckPlugin)

  .get(
    "/",
    async ({ query }) => {
      return await adminListAllUsersService(query);
    },
    {
      detail: adminListUsersDoc,
      response: Response(adminListUsersResponse),
      query: adminListUsersQueryParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body }) => {
      return await adminCreateUserService(body);
    },
    {
      body: createUserBody,
      detail: adminCreateUserDoc,
      response: Response(adminCreateUserResponse),
    },
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdateUserService(query, body);
    },
    {
      body: updateUserBody,
      query: userSelectQueryParams,
      detail: adminUpdateUserDoc,
      response: Response(adminUpdateUserResponse),
    },
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeleteUserService(query);
    },
    {
      query: adminDeleteUserQueryParams,
      detail: adminDeleteUserDoc,
      response: Response(adminDeleteUserResponse),
    },
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowUserService(query);
    },
    {
      query: userSelectQueryParams,
      detail: adminShowUserDoc,
      response: Response(adminShowUserResponse),
    },
  )
  .get(
    "/branches",
    async ({ query }) => {
      return await adminListUserBranchesService(query);
    },
    {
      query: userSelectQueryParams,
      detail: adminListUserBranchesDoc,
      response: Response(adminListUserBranchesResponse),
    },
  );
