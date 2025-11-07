import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PlanPlain = t.Object(
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
);

export const PlanRelations = t.Object(
  {
    subscriptions: t.Array(
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
          endsAt: __nullable__(t.Date()),
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

export const PlanPlainInputCreate = t.Object(
  {
    name: t.Any({ description: `[LocalString]` }),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    price: t.Optional(t.Integer()),
    maxCategories: t.Optional(t.Integer()),
    maxItems: t.Optional(t.Integer()),
    maxStaff: t.Optional(t.Integer()),
    maxMedia: t.Optional(t.Integer()),
    isActive: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const PlanPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.Any({ description: `[LocalString]` })),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    price: t.Optional(t.Integer()),
    maxCategories: t.Optional(t.Integer()),
    maxItems: t.Optional(t.Integer()),
    maxStaff: t.Optional(t.Integer()),
    maxMedia: t.Optional(t.Integer()),
    isActive: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const PlanRelationsInputCreate = t.Object(
  {
    subscriptions: t.Optional(
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

export const PlanRelationsInputUpdate = t.Partial(
  t.Object(
    {
      subscriptions: t.Partial(
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

export const PlanWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.Any({ description: `[LocalString]` }),
          description: t.Any({ description: `[LocalString]` }),
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
    { $id: "Plan" },
  ),
);

export const PlanWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
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
              name: t.Any({ description: `[LocalString]` }),
              description: t.Any({ description: `[LocalString]` }),
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
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Plan" },
);

export const PlanSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      price: t.Boolean(),
      maxCategories: t.Boolean(),
      maxItems: t.Boolean(),
      maxStaff: t.Boolean(),
      maxMedia: t.Boolean(),
      isActive: t.Boolean(),
      subscriptions: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PlanInclude = t.Partial(
  t.Object(
    { subscriptions: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const PlanOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxCategories: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxItems: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxStaff: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      maxMedia: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isActive: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Plan = t.Composite([PlanPlain, PlanRelations], {
  additionalProperties: false,
});

export const PlanInputCreate = t.Composite(
  [PlanPlainInputCreate, PlanRelationsInputCreate],
  { additionalProperties: false },
);

export const PlanInputUpdate = t.Composite(
  [PlanPlainInputUpdate, PlanRelationsInputUpdate],
  { additionalProperties: false },
);
