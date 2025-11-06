import Elysia from "elysia";
import {
  createItemBodySchema,
  updateItemBodySchema,
} from "./schemas/request-body";
import {
  itemSelectQueryParamsSchema,
  listItemsQueryParamsSchema,
  searchItemsQueryParamsSchema,
} from "./schemas/query-params";
import {
  createItemDocs,
  deleteItemDocs,
  listItemsDocs,
  searchItemsDocs,
  showItemDocs,
  updateItemDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  createItemResponseSchema,
  deleteItemResponseSchema,
  listItemsResponseSchema,
  searchItemsResponseSchema,
  showItemResponseSchema,
  updateItemResponseSchema,
} from "./schemas/response";
import { businessPlugin } from "@/src/plugins/auth-plugin";
import {
  createItemService,
  deleteItemService,
  listItemsService,
  searchItemsService,
  showItemService,
  updateItemService,
} from "./service";

export const businessItemRoutes = new Elysia({
  prefix: "/business/item",
  tags: ["business (Item)"],
})
  .use(businessPlugin)

  .get(
    "/",
    async ({ query, organizationId }) => {
      return await listItemsService(organizationId, query);
    },
    {
      detail: listItemsDocs,
      response: Response(listItemsResponseSchema),
      query: listItemsQueryParamsSchema,
    }
  )
  .post(
    "/",
    async ({ body, organizationId }) => {
      return await createItemService(organizationId, body);
    },
    {
      body: createItemBodySchema,
      detail: createItemDocs,
      response: Response(createItemResponseSchema),
    }
  )
  .patch(
    "/",
    async ({ body, query, organizationId }) => {
      return await updateItemService(organizationId, query, body);
    },
    {
      body: updateItemBodySchema,
      query: itemSelectQueryParamsSchema,
      detail: updateItemDocs,
      response: Response(updateItemResponseSchema),
    }
  )
  .delete(
    "/",
    async ({ query, organizationId }) => {
      return await deleteItemService(organizationId, query);
    },
    {
      query: itemSelectQueryParamsSchema,
      detail: deleteItemDocs,
      response: Response(deleteItemResponseSchema),
    }
  )
  .get(
    "/show",
    async ({ query, organizationId }) => {
      return await showItemService(organizationId, query);
    },
    {
      query: itemSelectQueryParamsSchema,
      detail: showItemDocs,
      response: Response(showItemResponseSchema),
    }
  )
  .get(
    "/search",
    async ({ query, organizationId }) => {
      return await searchItemsService(organizationId, query);
    },
    {
      query: searchItemsQueryParamsSchema,
      detail: searchItemsDocs,
      response: Response(searchItemsResponseSchema),
    }
  );
