import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const SubscriptionPlain = t.Object(
  {
    id: t.String(),
    organizationId: t.String(),
    planId: t.String(),
    status: t.Union(
      [
        t.Literal("Active"),
        t.Literal("Inactive"),
        t.Literal("Trial"),
        t.Literal("Expired"),
      ],
      { additionalProperties: false },
    ),
    endsAt: __nullable__(t.Date()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const SubscriptionRelations = t.Object(
  {
    organization: t.Object(
      {
        id: t.String(),
        name: t.Any({ description: `[LocalString]` }),
        description: __nullable__(t.Any({ description: `[LocalString]` })),
        phoneNumber: __nullable__(t.String()),
        email: __nullable__(t.String()),
        googleMapsLink: __nullable__(t.String()),
        socialMedia: t.Array(t.Any({ description: `[SocialMediaLink]` }), {
          additionalProperties: false,
        }),
        slug: t.String(),
        logoImgUrl: __nullable__(t.String()),
        menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
          additionalProperties: false,
        }),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    plan: t.Object(
      {
        id: t.String(),
        name: t.Any({ description: `[LocalString]` }),
        description: __nullable__(t.Any({ description: `[LocalString]` })),
        price: t.Integer(),
        maxCategories: t.Integer(),
        maxItems: t.Integer(),
        maxStaff: t.Integer(),
        maxMedia: t.Integer(),
        isActive: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    payments: t.Array(
      t.Object(
        {
          id: t.String(),
          amount: t.Integer(),
          paidAt: t.Date(),
          periodStart: t.Date(),
          periodEnd: t.Date(),
          notes: __nullable__(t.String()),
          imageUrl: __nullable__(t.String()),
          waylReferenceId: __nullable__(t.String()),
          waylLinkId: __nullable__(t.String()),
          waylStatus: __nullable__(t.String()),
          isPaid: t.Boolean(),
          subscriptionId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const SubscriptionPlainInputCreate = t.Object(
  {
    status: t.Optional(
      t.Union(
        [
          t.Literal("Active"),
          t.Literal("Inactive"),
          t.Literal("Trial"),
          t.Literal("Expired"),
        ],
        { additionalProperties: false },
      ),
    ),
    endsAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const SubscriptionPlainInputUpdate = t.Object(
  {
    status: t.Optional(
      t.Union(
        [
          t.Literal("Active"),
          t.Literal("Inactive"),
          t.Literal("Trial"),
          t.Literal("Expired"),
        ],
        { additionalProperties: false },
      ),
    ),
    endsAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const SubscriptionRelationsInputCreate = t.Object(
  {
    organization: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    plan: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    payments: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const SubscriptionRelationsInputUpdate = t.Partial(
  t.Object(
    {
      organization: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      plan: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      payments: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const SubscriptionWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          organizationId: t.String(),
          planId: t.String(),
          status: t.Union(
            [
              t.Literal("Active"),
              t.Literal("Inactive"),
              t.Literal("Trial"),
              t.Literal("Expired"),
            ],
            { additionalProperties: false },
          ),
          endsAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Subscription" },
  ),
);

export const SubscriptionWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), organizationId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ organizationId: t.String() }),
          ],
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              organizationId: t.String(),
              planId: t.String(),
              status: t.Union(
                [
                  t.Literal("Active"),
                  t.Literal("Inactive"),
                  t.Literal("Trial"),
                  t.Literal("Expired"),
                ],
                { additionalProperties: false },
              ),
              endsAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Subscription" },
);

export const SubscriptionSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      organization: t.Boolean(),
      organizationId: t.Boolean(),
      plan: t.Boolean(),
      planId: t.Boolean(),
      status: t.Boolean(),
      endsAt: t.Boolean(),
      payments: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SubscriptionInclude = t.Partial(
  t.Object(
    {
      organization: t.Boolean(),
      plan: t.Boolean(),
      status: t.Boolean(),
      payments: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const SubscriptionOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      planId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      endsAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Subscription = t.Composite(
  [SubscriptionPlain, SubscriptionRelations],
  { additionalProperties: false },
);

export const SubscriptionInputCreate = t.Composite(
  [SubscriptionPlainInputCreate, SubscriptionRelationsInputCreate],
  { additionalProperties: false },
);

export const SubscriptionInputUpdate = t.Composite(
  [SubscriptionPlainInputUpdate, SubscriptionRelationsInputUpdate],
  { additionalProperties: false },
);
