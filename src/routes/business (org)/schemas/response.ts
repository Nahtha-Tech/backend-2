import { t } from "elysia";

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
  menuStructure: t.Array(t.Any()),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

const StructureNodeSchema: any = t.Object({
  type: t.Union([t.Literal("category"), t.Literal("item")]),
  id: t.String(),
  children: t.Optional(t.Array(t.Any())),
});

export const getMenuStructureResponseSchema = t.Array(
  t.Object({
    type: t.Union([t.Literal("category"), t.Literal("item")]),
    id: t.String(),
    data: t.Optional(t.Any()),
    children: t.Optional(
      t.Array(
        t.Object({
          type: t.Union([t.Literal("category"), t.Literal("item")]),
          id: t.String(),
          data: t.Optional(t.Any()),
        })
      )
    ),
  })
);

export const getOrgResponseSchema = OrgResponseSchema;
export const updateOrgResponseSchema = OrgResponseSchema;
export const updateMenuStructureResponseSchema = t.Array(StructureNodeSchema);
