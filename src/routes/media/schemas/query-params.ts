import { t } from "elysia";

export const uploadMediaQueryParams = t.Object({
  uploadType: t.Union(
    [
      t.Literal("categoryImage"),
      t.Literal("itemImage"),
      t.Literal("orgLogo"),
      t.Literal("avatarImage"),
    ],
    {
      description: "Type of upload",
    }
  ),
  entityId: t.String({
    description: "ID of the entity",
    format: "uuid",
  }),
});

export const deleteMediaQueryParams = t.Object({
  id: t.String({
    format: "uuid",
    description: "Media id",
  }),
});
