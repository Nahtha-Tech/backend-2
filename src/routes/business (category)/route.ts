import Elysia from "elysia";
import {
  createCategoryBodySchema,
  updateCategoryBodySchema,
} from "./schemas/request-body";
import {
  categorySelectQueryParamsSchema,
  listCategoriesQueryParamsSchema,
} from "./schemas/query-params";
import {
  createCategoryDocs,
  deleteCategoryDocs,
  listCategoriesDocs,
  updateCategoryDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  createCategoryResponseSchema,
  deleteCategoryResponseSchema,
  listCategoriesResponseSchema,
  updateCategoryResponseSchema,
} from "./schemas/response";
import { businessPlugin } from "@/src/plugins/auth-plugin";
import {
  createCategoryService,
  deleteCategoryService,
  listCategoriesService,
  updateCategoryService,
} from "./service";

export const businessCategoryRoutes = new Elysia({
  prefix: "/business/category",
  tags: ["business (Category)"],
})
  .use(businessPlugin)

  .get(
    "/",
    async ({ query, organizationId }) => {
      return await listCategoriesService(organizationId, query);
    },
    {
      detail: listCategoriesDocs,
      response: Response(listCategoriesResponseSchema),
      query: listCategoriesQueryParamsSchema,
    }
  )
  .post(
    "/",
    async ({ body, organizationId }) => {
      return await createCategoryService(organizationId, body);
    },
    {
      body: createCategoryBodySchema,
      detail: createCategoryDocs,
      response: Response(createCategoryResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, query, organizationId }) => {
      return await updateCategoryService(organizationId, query, body);
    },
    {
      body: updateCategoryBodySchema,
      query: categorySelectQueryParamsSchema,
      detail: updateCategoryDocs,
      response: Response(updateCategoryResponseSchema),
    }
  )
  .delete(
    "/",
    async ({ query, organizationId }) => {
      return await deleteCategoryService(organizationId, query);
    },
    {
      query: categorySelectQueryParamsSchema,
      detail: deleteCategoryDocs,
      response: Response(deleteCategoryResponseSchema),
    }
  );
