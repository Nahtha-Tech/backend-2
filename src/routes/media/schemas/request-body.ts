import { t } from "elysia";

export const uploadMediaBody = t.Object({
  file: t.File({
    type: "image/*",
    maxSize: "10m",
    description: "Image file to upload",
  }),
});
