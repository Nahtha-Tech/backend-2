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

const PublicOrgResponseSchema = t.Object({
  name: LocalStringSchema,
  description: t.Nullable(LocalStringSchema),
  phoneNumber: t.Nullable(t.String()),
  email: t.Nullable(t.String()),
  googleMapsLink: t.Nullable(t.String()),
  socialMedia: t.Array(SocialMediaLinkSchema),
  slug: t.String(),
  logoImgUrl: t.Nullable(t.String()),
});

const PublicCategoryResponseSchema = t.Object({
  id: t.String(),
  slug: t.String(),
  name: t.Any(),
  imageUrl: t.Nullable(t.String()),
});

const PublicItemResponseSchema = t.Object({
  id: t.String(),
  slug: t.String(),
  name: t.Any(),
  description: t.Nullable(t.Any()),
  imageUrl: t.Array(t.String()),
  basePrice: t.String(),
  variantGroups: t.Nullable(t.Any()),
});

const MenuNodeSchema = t.Object({
  type: t.Union([t.Literal("category"), t.Literal("item")]),
  id: t.String(),
  order: t.Number(),
  data: t.Optional(t.Any()),
  children: t.Optional(t.Array(t.Any())),
});

export const getPublicOrgResponseSchema = PublicOrgResponseSchema;

export const getPublicCategoriesResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  categories: t.Array(PublicCategoryResponseSchema),
});

export const getPublicItemsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  items: t.Array(PublicItemResponseSchema),
});

export const getPublicItemDetailsResponseSchema = PublicItemResponseSchema;

export const getPublicMenuStructureResponseSchema = t.Array(MenuNodeSchema);

export const searchPublicItemsResponseSchema = t.Object({
  total: t.Number(),
  page: t.Number(),
  limit: t.Number(),
  totalPages: t.Number(),
  items: t.Array(PublicItemResponseSchema),
});