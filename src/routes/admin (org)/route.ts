import Elysia from "elysia";
import {
  createOrgBodySchema,
  updateOrgBodySchema,
} from "./schemas/request-body";
import {
  adminDeleteOrgQueryParamsSchema,
  adminListOrgsQueryParamsSchema,
  orgSelectQueryParamsSchema,
} from "./schemas/query-params";
import {
  adminCreateOrgDocs,
  adminDeleteOrgDocs,
  adminListOrgsDocs,
  adminShowOrgDocs,
  adminUpdateOrgDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  adminCreateOrgResponseSchema,
  adminDeleteOrgResponseSchema,
  adminListOrgsResponseSchema,
  adminShowOrgResponseSchema,
  adminUpdateOrgResponseSchema,
} from "./schemas/response";
import { adminCheckPlugin } from "@/src/plugins/auth-plugin";
import {
  adminCreateOrgService,
  adminDeleteOrgService,
  adminListAllOrgsService,
  adminShowOrgService,
  adminUpdateOrgService,
} from "./service";

export const adminOrgRoutes = new Elysia({
  prefix: "/admin/org",
  tags: ["admin (Org)"],
})
  .use(adminCheckPlugin)

  .get(
    "/",
    async ({ query }) => {
      return await adminListAllOrgsService(query);
    },
    {
      detail: adminListOrgsDocs,
      response: Response(adminListOrgsResponseSchema),
      query: adminListOrgsQueryParamsSchema,
    }
  )
  .post(
    "/",
    async ({ body }) => {
      return await adminCreateOrgService(body);
    },
    {
      body: createOrgBodySchema,
      detail: adminCreateOrgDocs,
      response: Response(adminCreateOrgResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdateOrgService(query, body);
    },
    {
      body: updateOrgBodySchema,
      query: orgSelectQueryParamsSchema,
      detail: adminUpdateOrgDocs,
      response: Response(adminUpdateOrgResponseSchema),
    }
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeleteOrgService(query);
    },
    {
      query: adminDeleteOrgQueryParamsSchema,
      detail: adminDeleteOrgDocs,
      response: Response(adminDeleteOrgResponseSchema),
    }
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowOrgService(query);
    },
    {
      query: orgSelectQueryParamsSchema,
      detail: adminShowOrgDocs,
      response: Response(adminShowOrgResponseSchema),
    }
  );
