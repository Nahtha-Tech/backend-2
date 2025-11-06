import Elysia from "elysia";
import { uploadMediaDoc, deleteMediaDoc } from "./docs/docs";
import { uploadMediaResponse, deleteMediaResponse } from "./schemas/response";
import { uploadMediaBody } from "./schemas/request-body";
import {
  uploadMediaQueryParams,
  deleteMediaQueryParams,
} from "./schemas/query-params";
import { uploadMediaService, deleteMediaService } from "./service";
import { businessPlugin } from "@/src/plugins/auth-plugin";
import Response from "@/src/utils/global-response";
import ApiError from "@/src/utils/global-error";

export const mediaRoutes = new Elysia({
  prefix: "/media",
  tags: ["Media"],
})
  .use(businessPlugin)
  .post(
    "/upload",
    async ({ body, query, organizationId }) => {
      if (!body?.file) {
        throw new ApiError("No file provided");
      }

      return await uploadMediaService(
        body.file,
        query.uploadType,
        query.entityId,
        organizationId
      );
    },
    {
      detail: uploadMediaDoc,
      body: uploadMediaBody,
      query: uploadMediaQueryParams,
      response: Response(uploadMediaResponse),
      type: "multipart/form-data",
    }
  )
  .delete(
    "/",
    async ({ query, organizationId }) => {
      return await deleteMediaService(query.id, organizationId);
    },
    {
      detail: deleteMediaDoc,
      query: deleteMediaQueryParams,
      response: Response(deleteMediaResponse),
    }
  );
