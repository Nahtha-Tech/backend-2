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

const OrgResponseSchema = t.Object({
  id: t.String(),
  name: LocalStringSchema,
  description: t.Nullable(LocalStringSchema),
  phoneNumber: t.Nullable(t.String()),
  email: t.Nullable(t.String()),
  googleMapsLink: t.Nullable(t.String()),
  socialMedia: t.Array(SocialMediaLinkSchema),
  slug: t.String(),
  logoImgUrl: t.Nullable(t.String()),
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

const MenuNodeSchema = t.Object({
  type: t.Union([t.Literal("category"), t.Literal("item")]),
  id: t.String(),
  order: t.Number(),
  data: t.Optional(t.Any()),
  children: t.Optional(t.Array(t.Any())),
});

export const getMenuStructureResponseSchema = t.Array(MenuNodeSchema);
export const updateMenuStructureResponseSchema = t.Array(MenuNodeSchema);

export const getOrgResponseSchema = OrgResponseSchema;
export const updateOrgResponseSchema = OrgResponseSchema;
