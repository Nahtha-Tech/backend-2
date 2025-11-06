import { t } from "elysia";

export const orgSelectQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
    })
  ),
});

export const adminListOrgsQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "Organization email",
    })
  ),
  page: t.Optional(
    t.Number({
      minimum: 1,
      default: 1,
      description: "Page number",
    })
  ),
  limit: t.Optional(
    t.Number({
      minimum: 1,
      maximum: 100,
      default: 10,
      description: "Items per page",
    })
  ),
});

export const adminDeleteOrgQueryParamsSchema = t.Object({
  id: t.Optional(
    t.String({
      format: "uuid",
      description: "Organization id",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug",
    })
  ),
});

export const adminListPaymentsQueryParamsSchema = t.Object({
  organizationId: t.String({
    format: "uuid",
    description: "Organization ID to get payments for",
  }),
  page: t.Optional(
    t.Number({
      minimum: 1,
      default: 1,
      description: "Page number",
    })
  ),
  limit: t.Optional(
    t.Number({
      minimum: 1,
      maximum: 100,
      default: 10,
      description: "Items per page",
    })
  ),
  isPaid: t.Optional(
    t.Boolean({
      description: "Filter by payment status",
    })
  ),
});
