import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const SocialMediaLinkSchema = t.Object({
  label: t.String(),
  type: t.Union([
    t.Literal("instagram"),
    t.Literal("facebook"),
    t.Literal("twitter"),
    t.Literal("tiktok"),
    t.Literal("youtube"),
    t.Literal("linkedin"),
    t.Literal("whatsapp"),
  ]),
  link: t.String(),
});

const PlanSchema = t.Object({
  id: t.String(),
  name: t.Any(),
  description: t.Nullable(t.Any()),
  price: t.Number(),
  maxCategories: t.Number(),
  maxItems: t.Number(),
  maxStaff: t.Number(),
  maxMedia: t.Number(),
  isActive: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

const SubscriptionSchema = t.Object({
  id: t.String(),
  status: t.Union([
    t.Literal("Active"),
    t.Literal("Inactive"),
    t.Literal("Trial"),
    t.Literal("Expired"),
  ]),
  endsAt: t.Nullable(t.Date()),
  plan: PlanSchema,
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

const OrgResponseSchema = t.Object({
  id: t.String(),
  name: t.Any(),
  description: t.Nullable(t.Any()),
  phoneNumber: t.Nullable(t.String()),
  email: t.Nullable(t.String()),
  googleMapsLink: t.Nullable(t.String()),
  socialMedia: t.Array(t.Any()),
  slug: t.String(),
  logoImgUrl: t.Nullable(t.String()),
  subscription: t.Nullable(SubscriptionSchema),
  menuStructure: t.Array(
    t.Object({
      type: t.Union([t.Literal("category"), t.Literal("item")]),
      id: t.String(),
      order: t.Number(),
      children: t.Optional(t.Array(t.Any())),
    })
  ),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const adminListOrgsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  orgs: t.Array(OrgResponseSchema),
});

export const CreatePaymentLinkResponseSchema = t.Object({
  paymentId: t.String(),
  paymentUrl: t.String(),
  amount: t.Number(),
  currency: t.String(),
  expiresAt: t.Date(),
});

const PaymentResponseSchema = t.Object({
  id: t.String(),
  amount: t.Number(),
  paidAt: t.Date(),
  periodStart: t.Date(),
  periodEnd: t.Date(),
  notes: t.Nullable(t.String()),
  imageUrl: t.Nullable(t.String()),
  waylReferenceId: t.Nullable(t.String()),
  waylStatus: t.Nullable(t.String()),
  isPaid: t.Boolean(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const adminListPaymentsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  payments: t.Array(PaymentResponseSchema),
});

export const waylWebhookRouteSchema = t.Null();
export const adminCreateOrgResponseSchema = OrgResponseSchema;
export const adminUpdateOrgResponseSchema = OrgResponseSchema;
export const adminDeleteOrgResponseSchema = t.Null();
export const adminShowOrgResponseSchema = OrgResponseSchema;
