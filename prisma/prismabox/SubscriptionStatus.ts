import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SubscriptionStatus = t.Union(
  [
    t.Literal("Active"),
    t.Literal("Inactive"),
    t.Literal("Trial"),
    t.Literal("Expired"),
  ],
  { additionalProperties: false },
);
