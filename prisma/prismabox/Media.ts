import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const MediaPlain = t.Object(
  {
    id: t.String(),
    url: t.String(),
    key: t.String(),
    name: t.String(),
    size: t.Integer(),
    originalSize: t.Integer(),
    originalName: t.String(),
    type: t.Union(
      [
        t.Literal("categoryImage"),
        t.Literal("itemImage"),
        t.Literal("orgLogo"),
        t.Literal("avatarImage"),
      ],
      { additionalProperties: false },
    ),
    entityId: t.String(),
    organizationId: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const MediaRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const MediaPlainInputCreate = t.Object(
  {
    url: t.String(),
    key: t.String(),
    name: t.String(),
    size: t.Integer(),
    originalSize: t.Integer(),
    originalName: t.String(),
    type: t.Union(
      [
        t.Literal("categoryImage"),
        t.Literal("itemImage"),
        t.Literal("orgLogo"),
        t.Literal("avatarImage"),
      ],
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const MediaPlainInputUpdate = t.Object(
  {
    url: t.Optional(t.String()),
    key: t.Optional(t.String()),
    name: t.Optional(t.String()),
    size: t.Optional(t.Integer()),
    originalSize: t.Optional(t.Integer()),
    originalName: t.Optional(t.String()),
    type: t.Optional(
      t.Union(
        [
          t.Literal("categoryImage"),
          t.Literal("itemImage"),
          t.Literal("orgLogo"),
          t.Literal("avatarImage"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const MediaRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const MediaRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const MediaWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          url: t.String(),
          key: t.String(),
          name: t.String(),
          size: t.Integer(),
          originalSize: t.Integer(),
          originalName: t.String(),
          type: t.Union(
            [
              t.Literal("categoryImage"),
              t.Literal("itemImage"),
              t.Literal("orgLogo"),
              t.Literal("avatarImage"),
            ],
            { additionalProperties: false },
          ),
          entityId: t.String(),
          organizationId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Media" },
  ),
);

export const MediaWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), key: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() }), t.Object({ key: t.String() })], {
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
              url: t.String(),
              key: t.String(),
              name: t.String(),
              size: t.Integer(),
              originalSize: t.Integer(),
              originalName: t.String(),
              type: t.Union(
                [
                  t.Literal("categoryImage"),
                  t.Literal("itemImage"),
                  t.Literal("orgLogo"),
                  t.Literal("avatarImage"),
                ],
                { additionalProperties: false },
              ),
              entityId: t.String(),
              organizationId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Media" },
);

export const MediaSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      url: t.Boolean(),
      key: t.Boolean(),
      name: t.Boolean(),
      size: t.Boolean(),
      originalSize: t.Boolean(),
      originalName: t.Boolean(),
      type: t.Boolean(),
      entityId: t.Boolean(),
      organization: t.Boolean(),
      organizationId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const MediaInclude = t.Partial(
  t.Object(
    { type: t.Boolean(), organization: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const MediaOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      key: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      size: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      originalSize: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      originalName: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      entityId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      organizationId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Media = t.Composite([MediaPlain, MediaRelations], {
  additionalProperties: false,
});

export const MediaInputCreate = t.Composite(
  [MediaPlainInputCreate, MediaRelationsInputCreate],
  { additionalProperties: false },
);

export const MediaInputUpdate = t.Composite(
  [MediaPlainInputUpdate, MediaRelationsInputUpdate],
  { additionalProperties: false },
);
