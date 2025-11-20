import { t } from "elysia";

const LocalStringSchema = t.Object({
  en: t.Optional(t.String()),
  ar: t.Optional(t.String()),
  ku: t.Optional(t.String()),
  tr: t.Optional(t.String()),
});

const SocialMediaLinkSchema = t.Object({
  label: t.String({
    description: "Social media label",
    examples: ["Facebook Page"],
  }),
  type: t.Union([
    t.Literal("instagram"),
    t.Literal("facebook"),
    t.Literal("twitter"),
    t.Literal("tiktok"),
    t.Literal("youtube"),
    t.Literal("linkedin"),
    t.Literal("whatsapp"),
  ]),
  link: t.String({
    format: "uri",
    description: "Social media link",
    examples: ["https://facebook.com/example"],
  }),
});

export const createOrgBodySchema = t.Object({
  name: LocalStringSchema,
  description: t.Optional(LocalStringSchema),
  phoneNumber: t.Optional(
    t.String({
      description: "Organization phone number",
      examples: ["+9647501234567"],
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "Organization email",
      examples: ["info@example.com"],
    })
  ),
  googleMapsLink: t.Optional(
    t.String({
      format: "uri",
      description: "Google Maps location link",
      examples: ["https://maps.google.com/?q=36.19,44.01"],
    })
  ),
  socialMedia: t.Optional(
    t.Array(SocialMediaLinkSchema, {
      description: "Social media links",
    })
  ),
  slug: t.String({
    format: "uri-reference",
    description: "Organization slug (unique identifier)",
    examples: ["omaro-llc"],
  }),
  logoImgUrl: t.Optional(
    t.String({
      format: "uri",
      description: "Organization logo URL",
      examples: ["https://example.com/logo.jpg"],
    })
  ),
  planId: t.Optional(
    t.String({
      format: "uuid",
      description: "Plan ID to assign to organization",
    })
  ),
});

export const updateOrgBodySchema = t.Object({
  name: t.Optional(LocalStringSchema),
  description: t.Optional(LocalStringSchema),
  phoneNumber: t.Optional(
    t.String({
      description: "Organization phone number",
      examples: ["+9647501234567"],
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "Organization email",
      examples: ["info@example.com"],
    })
  ),
  googleMapsLink: t.Optional(
    t.String({
      format: "uri",
      description: "Google Maps location link",
      examples: ["https://maps.google.com/?q=36.19,44.01"],
    })
  ),
  socialMedia: t.Optional(
    t.Array(SocialMediaLinkSchema, {
      description: "Social media links",
    })
  ),
  slug: t.Optional(
    t.String({
      format: "uri-reference",
      description: "Organization slug (unique identifier)",
      examples: ["omaro-llc"],
    })
  ),
  logoImgUrl: t.Optional(
    t.String({
      format: "uri",
      description: "Organization logo URL",
      examples: ["https://example.com/logo.jpg"],
    })
  ),
  planId: t.Optional(
    t.String({
      format: "uuid",
      description: "Plan ID to assign to organization",
    })
  ),
});

export const waylWebhookRouteBodySchema = t.Object(
  {
    verb: t.String(),
    event: t.String(),
    referenceId: t.String(),
    paymentMethod: t.String(),
    paymentStatus: t.String(),
    paymentProcessor: t.String(),
    total: t.Number(),
    commission: t.Number(),
    code: t.String(),
    customer: t.Object({
      id: t.String(),
      name: t.String(),
      phone: t.String(),
      city: t.String(),
      country: t.String(),
      address: t.String(),
    }),
    items: t.Array(
      t.Object({
        type: t.String(),
        image: t.String({ format: "uri" }),
        label: t.String(),
        amount: t.Number(),
      })
    ),
    id: t.String(),
    completedAt: t.Optional(t.String({ format: "date-time" })),
  },
  {
    additionalProperties: true,
  }
);
