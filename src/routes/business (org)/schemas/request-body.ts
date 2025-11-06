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
  logoImgUrl: t.Optional(
    t.String({
      format: "uri",
      description: "Organization logo URL",
      examples: ["https://example.com/logo.jpg"],
    })
  ),
});

export const updateMenuStructureBodySchema = t.Object({
  menuStructure: t.Array(
    t.Object({
      type: t.Union([t.Literal("category"), t.Literal("item")]),
      id: t.String({ format: "uuid" }),
      order: t.Number({ minimum: 0 }),
      children: t.Optional(t.Array(t.Any())),
    }),
    {
      description: "Complete menu structure with ordering",
    }
  ),
});
