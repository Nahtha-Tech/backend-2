import Elysia from "elysia";
import Response from "@/src/utils/global-response";
import {
  getPublicCategoriesDocs,
  getPublicItemDetailsDocs,
  getPublicItemsDocs,
  getPublicMenuStructureDocs,
  getPublicOrgDocs,
  searchPublicItemsDocs,
} from "./docs/docs";
import {
  getPublicCategoriesResponseSchema,
  getPublicItemDetailsResponseSchema,
  getPublicItemsResponseSchema,
  getPublicMenuStructureResponseSchema,
  getPublicOrgResponseSchema,
  searchPublicItemsResponseSchema,
} from "./schemas/response";
import {
  publicCategoriesQueryParamsSchema,
  publicItemDetailsQueryParamsSchema,
  publicItemsQueryParamsSchema,
  publicMenuStructureQueryParamsSchema,
  publicOrgQueryParamsSchema,
  publicSearchItemsQueryParamsSchema,
} from "./schemas/query-params";
import {
  getPublicCategoriesService,
  getPublicItemDetailsService,
  getPublicItemsService,
  getPublicMenuStructureService,
  getPublicOrgService,
  searchPublicItemsService,
} from "./service";

export const publicRoutes = new Elysia({
  prefix: "/public",
  tags: ["Public"],
})
  .get(
    "/org",
    async ({ query }) => {
      return await getPublicOrgService(query);
    },
    {
      detail: getPublicOrgDocs,
      query: publicOrgQueryParamsSchema,
      response: Response(getPublicOrgResponseSchema),
    }
  )
  .get(
    "/categories",
    async ({ query }) => {
      return await getPublicCategoriesService(query);
    },
    {
      detail: getPublicCategoriesDocs,
      query: publicCategoriesQueryParamsSchema,
      response: Response(getPublicCategoriesResponseSchema),
    }
  )
  .get(
    "/items",
    async ({ query }) => {
      return await getPublicItemsService(query);
    },
    {
      detail: getPublicItemsDocs,
      query: publicItemsQueryParamsSchema,
      response: Response(getPublicItemsResponseSchema),
    }
  )
  .get(
    "/item",
    async ({ query }) => {
      return await getPublicItemDetailsService(query);
    },
    {
      detail: getPublicItemDetailsDocs,
      query: publicItemDetailsQueryParamsSchema,
      response: Response(getPublicItemDetailsResponseSchema),
    }
  )
  .get(
    "/menu-structure",
    async ({ query }) => {
      return await getPublicMenuStructureService(query);
    },
    {
      detail: getPublicMenuStructureDocs,
      query: publicMenuStructureQueryParamsSchema,
      response: Response(getPublicMenuStructureResponseSchema),
    }
  )
  .get(
    "/search",
    async ({ query }) => {
      return await searchPublicItemsService(query);
    },
    {
      detail: searchPublicItemsDocs,
      query: publicSearchItemsQueryParamsSchema,
      response: Response(searchPublicItemsResponseSchema),
    }
  );