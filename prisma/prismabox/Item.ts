import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ItemPlain = t.Object(
  {
    id: t.String(),
    slug: t.String(),
    name: t.Any({ description: `[LocalString]` }),
    description: __nullable__(t.Any({ description: `[LocalString]` })),
    imageUrl: t.Array(t.String(), { additionalProperties: false }),
    basePrice: t.String(),
    variantGroups: __nullable__(t.Any({ description: `[ItemVariantGroup]` })),
    organizationId: t.String(),
    categoryId: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ItemRelations = t.Object(
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
        subscriptionStatus: t.Union(
          [
            t.Literal("Active"),
            t.Literal("Inactive"),
            t.Literal("Trial"),
            t.Literal("Expired"),
          ],
          { additionalProperties: false },
        ),
        subscriptionEndsAt: __nullable__(t.Date()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        planId: __nullable__(t.String()),
      },
      { additionalProperties: false },
    ),
    category: __nullable__(
      t.Object(
        {
          id: t.String(),
          slug: t.String(),
          name: t.Any({ description: `[LocalString]` }),
          imageUrl: __nullable__(t.String()),
          organizationId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ItemPlainInputCreate = t.Object(
  {
    slug: t.String(),
    name: t.Any({ description: `[LocalString]` }),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    imageUrl: t.Array(t.String(), { additionalProperties: false }),
    basePrice: t.String(),
    variantGroups: t.Optional(
      __nullable__(t.Any({ description: `[ItemVariantGroup]` })),
    ),
  },
  { additionalProperties: false },
);

export const ItemPlainInputUpdate = t.Object(
  {
    slug: t.Optional(t.String()),
    name: t.Optional(t.Any({ description: `[LocalString]` })),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    imageUrl: t.Optional(t.Array(t.String(), { additionalProperties: false })),
    basePrice: t.Optional(t.String()),
    variantGroups: t.Optional(
      __nullable__(t.Any({ description: `[ItemVariantGroup]` })),
    ),
  },
  { additionalProperties: false },
);

export const ItemRelationsInputCreate = t.Object(
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
    category: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const ItemRelationsInputUpdate = t.Partial(
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
      category: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const ItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          slug: t.String(),
          name: t.Any({ description: `[LocalString]` }),
          description: t.Any({ description: `[LocalString]` }),
          imageUrl: t.Array(t.String(), { additionalProperties: false }),
          basePrice: t.String(),
          variantGroups: t.Any({ description: `[ItemVariantGroup]` }),
          organizationId: t.String(),
          categoryId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Item" },
  ),
);

export const ItemWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), slug: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ slug: t.String() })],
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
              slug: t.String(),
              name: t.Any({ description: `[LocalString]` }),
              description: t.Any({ description: `[LocalString]` }),
              imageUrl: t.Array(t.String(), { additionalProperties: false }),
              basePrice: t.String(),
              variantGroups: t.Any({ description: `[ItemVariantGroup]` }),
              organizationId: t.String(),
              categoryId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Item" },
);

export const ItemSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      slug: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      imageUrl: t.Boolean(),
      basePrice: t.Boolean(),
      variantGroups: t.Boolean(),
      organization: t.Boolean(),
      organizationId: t.Boolean(),
      category: t.Boolean(),
      categoryId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ItemInclude = t.Partial(
  t.Object(
    { organization: t.Boolean(), category: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ItemOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      basePrice: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      variantGroups: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Item = t.Composite([ItemPlain, ItemRelations], {
  additionalProperties: false,
});

export const ItemInputCreate = t.Composite(
  [ItemPlainInputCreate, ItemRelationsInputCreate],
  { additionalProperties: false },
);

export const ItemInputUpdate = t.Composite(
  [ItemPlainInputUpdate, ItemRelationsInputUpdate],
  { additionalProperties: false },
);
