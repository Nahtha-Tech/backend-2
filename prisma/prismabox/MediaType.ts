import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MediaType = t.Union(
  [
    t.Literal("categoryImage"),
    t.Literal("itemImage"),
    t.Literal("orgLogo"),
    t.Literal("avatarImage"),
  ],
  { additionalProperties: false },
);
