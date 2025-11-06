import Elysia from "elysia";
import {
  createPlanBodySchema,
  updatePlanBodySchema,
} from "./schemas/request-body";
import {
  adminDeletePlanQueryParamsSchema,
  adminListPlansQueryParamsSchema,
  planSelectQueryParamsSchema,
} from "./schemas/query-params";
import {
  adminCreatePlanDocs,
  adminDeletePlanDocs,
  adminListPlansDocs,
  adminShowPlanDocs,
  adminUpdatePlanDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  adminCreatePlanResponseSchema,
  adminDeletePlanResponseSchema,
  adminListPlansResponseSchema,
  adminShowPlanResponseSchema,
  adminUpdatePlanResponseSchema,
} from "./schemas/response";
import { adminCheckPlugin } from "@/src/plugins/auth-plugin";
import {
  adminCreatePlanService,
  adminDeletePlanService,
  adminListAllPlansService,
  adminShowPlanService,
  adminUpdatePlanService,
} from "./service";

export const adminPlanRoutes = new Elysia({
  prefix: "/admin/plan",
  tags: ["admin (Plan)"],
})
  .use(adminCheckPlugin)
  .get(
    "/",
    async ({ query }) => {
      return await adminListAllPlansService(query);
    },
    {
      detail: adminListPlansDocs,
      response: Response(adminListPlansResponseSchema),
      query: adminListPlansQueryParamsSchema,
    }
  )
  .post(
    "/",
    async ({ body }) => {
      return await adminCreatePlanService(body);
    },
    {
      body: createPlanBodySchema,
      detail: adminCreatePlanDocs,
      response: Response(adminCreatePlanResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, query }) => {
      return await adminUpdatePlanService(query, body);
    },
    {
      body: updatePlanBodySchema,
      query: planSelectQueryParamsSchema,
      detail: adminUpdatePlanDocs,
      response: Response(adminUpdatePlanResponseSchema),
    }
  )
  .delete(
    "/",
    async ({ query }) => {
      return await adminDeletePlanService(query);
    },
    {
      query: adminDeletePlanQueryParamsSchema,
      detail: adminDeletePlanDocs,
      response: Response(adminDeletePlanResponseSchema),
    }
  )
  .get(
    "/show",
    async ({ query }) => {
      return await adminShowPlanService(query);
    },
    {
      query: planSelectQueryParamsSchema,
      detail: adminShowPlanDocs,
      response: Response(adminShowPlanResponseSchema),
    }
  );
