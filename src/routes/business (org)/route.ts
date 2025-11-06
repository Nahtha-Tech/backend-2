import Elysia from "elysia";
import {
  updateMenuStructureBodySchema,
  updateOrgBodySchema,
} from "./schemas/request-body";
import {
  getMenuStructureDocs,
  getOrgDocs,
  updateMenuStructureDocs,
  updateOrgDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  getMenuStructureResponseSchema,
  getOrgResponseSchema,
  updateMenuStructureResponseSchema,
  updateOrgResponseSchema,
} from "./schemas/response";
import { businessPlugin } from "@/src/plugins/auth-plugin";
import {
  getMenuStructureService,
  getOrgService,
  updateMenuStructureService,
  updateOrgService,
} from "./service";
import { getMenuStructureQueryParamsSchema } from "./schemas/query-params";

export const businessOrgRoutes = new Elysia({
  prefix: "/business/org",
  tags: ["business (Org)"],
})
  .use(businessPlugin)

  .get(
    "/",
    async ({ organizationId }) => {
      return await getOrgService(organizationId);
    },
    {
      detail: getOrgDocs,
      response: Response(getOrgResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, organizationId }) => {
      return await updateOrgService(organizationId, body);
    },
    {
      body: updateOrgBodySchema,
      detail: updateOrgDocs,
      response: Response(updateOrgResponseSchema),
    }
  )
  .get(
    "/structure",
    async ({ query, organizationId }) => {
      return await getMenuStructureService(organizationId, query);
    },
    {
      detail: getMenuStructureDocs,
      query: getMenuStructureQueryParamsSchema,
      response: Response(getMenuStructureResponseSchema),
    }
  )
  .put(
    "/menu-structure",
    async ({ body, organizationId }) => {
      return await updateMenuStructureService(organizationId, body);
    },
    {
      body: updateMenuStructureBodySchema,
      detail: updateMenuStructureDocs,
      response: Response(updateMenuStructureResponseSchema),
    }
  );
