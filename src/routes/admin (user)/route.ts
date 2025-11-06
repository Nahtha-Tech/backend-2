import Elysia from "elysia";
import {
  assignUserToOrgBodySchema,
  createUserBodySchema,
  updateUserBodySchema,
} from "./schemas/request-body";
import {
  adminDeleteUserQueryParamsSchema,
  adminListUsersQueryParamsSchema,
  userSelectQueryParamsSchema,
} from "./schemas/query-params";
import {
  adminAssignUserToOrgDocs,
  adminCreateUserDocs,
  adminDeleteUserDocs,
  adminListUsersDocs,
  adminShowUserDocs,
  adminUpdateUserDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  adminAssignUserToOrgResponseSchema,
  adminCreateUserResponseSchema,
  adminDeleteUserResponseSchema,
  adminListUsersResponseSchema,
  adminShowUserResponseSchema,
  adminUpdateUserResponseSchema,
} from "./schemas/response";
import { adminCheckPlugin } from "@/src/plugins/auth-plugin";
import {
  adminAssignUserToOrgService,
  adminCreateUserService,
  adminDeleteUserService,
  adminListAllUsersService,
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
      detail: adminListUsersDocs,
      response: Response(adminListUsersResponseSchema),
      query: adminListUsersQueryParamsSchema,
    }
  )
  .post(
    "/",
    async ({ body }) => {
      return await adminCreateUserService(body);
    },
    {
      body: createUserBodySchema,
      detail: adminCreateUserDocs,
      response: Response(adminCreateUserResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdateUserService(query, body);
    },
    {
      body: updateUserBodySchema,
      query: userSelectQueryParamsSchema,
      detail: adminUpdateUserDocs,
      response: Response(adminUpdateUserResponseSchema),
    }
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeleteUserService(query);
    },
    {
      query: adminDeleteUserQueryParamsSchema,
      detail: adminDeleteUserDocs,
      response: Response(adminDeleteUserResponseSchema),
    }
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowUserService(query);
    },
    {
      query: userSelectQueryParamsSchema,
      detail: adminShowUserDocs,
      response: Response(adminShowUserResponseSchema),
    }
  )
  .patch(
    "/assign-org",
    async ({ body, query }) => {
      return await adminAssignUserToOrgService(query, body);
    },
    {
      body: assignUserToOrgBodySchema,
      query: userSelectQueryParamsSchema,
      detail: adminAssignUserToOrgDocs,
      response: Response(adminAssignUserToOrgResponseSchema),
    }
  );
