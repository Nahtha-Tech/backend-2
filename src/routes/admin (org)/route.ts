import Elysia from "elysia";
import {
  createOrgBodySchema,
  updateOrgBodySchema,
  waylWebhookRouteBodySchema,
} from "./schemas/request-body";
import {
  adminDeleteOrgQueryParamsSchema,
  adminListOrgsQueryParamsSchema,
  adminListPaymentsQueryParamsSchema,
  orgSelectQueryParamsSchema,
} from "./schemas/query-params";
import {
  adminCreateOrgDocs,
  adminDeleteOrgDocs,
  adminListOrgPaymentsDocs,
  adminListOrgsDocs,
  adminShowOrgDocs,
  adminUpdateOrgDocs,
} from "./docs/docs";
import Response from "@/src/utils/global-response";
import {
  adminCreateOrgResponseSchema,
  adminDeleteOrgResponseSchema,
  adminListOrgsResponseSchema,
  adminListPaymentsResponseSchema,
  adminShowOrgResponseSchema,
  adminUpdateOrgResponseSchema,
  CreatePaymentLinkResponseSchema,
  waylWebhookRouteSchema,
} from "./schemas/response";
import { adminCheckPlugin } from "@/src/plugins/auth-plugin";
import {
  adminCreateOrgService,
  adminCreatePaymentLinkService,
  adminDeleteOrgService,
  adminListAllOrgsService,
  adminListPaymentsService,
  adminShowOrgService,
  adminUpdateOrgService,
  handleWaylWebhookService,
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
  )
  .post(
    "/:orgId/create-payment-link",
    async ({ params }) => {
      return await adminCreatePaymentLinkService(params.orgId);
    },
    {
      detail: {
        summary: "Create payment link",
        description: "Generate Wayl payment link",
        operationId: "adminCreatePaymentLink",
      },
      response: Response(CreatePaymentLinkResponseSchema),
    }
  )
  .get(
    "/payments",
    async ({ query }) => {
      return await adminListPaymentsService(query);
    },
    {
      detail: adminListOrgPaymentsDocs,
      query: adminListPaymentsQueryParamsSchema,
      response: Response(adminListPaymentsResponseSchema),
    }
  );

export const waylWebhookRoute = new Elysia({
  prefix: "/webhooks",
  tags: ["Webhooks"],
}).post(
  "/wayl",
  async ({ body, headers }) => {
    const signature = headers["x-wayl-signature-256"];

    console.log("=== Webhook Debug Info ===");
    console.log("All headers:", headers);
    console.log("Signature header:", headers["x-wayl-signature-256"]);
    console.log("Body type:", typeof body);
    console.log("Body content:", body);

    return await handleWaylWebhookService(body, signature);
  },
  {
    type: "text",
    response: Response(waylWebhookRouteSchema),
    body: waylWebhookRouteBodySchema,
  }
);
