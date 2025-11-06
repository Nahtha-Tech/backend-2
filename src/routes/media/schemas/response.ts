import { t } from "elysia";

const MediaResponseSchema = t.Object({
  id: t.String(),
  url: t.String(),
  key: t.String(),
  name: t.String(),
  size: t.Number(),
  originalSize: t.Number(),
  originalName: t.String(),
  type: t.String(),
  entityId: t.String(),
  organizationId: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

export const uploadMediaResponse = MediaResponseSchema;
export const deleteMediaResponse = t.Null();