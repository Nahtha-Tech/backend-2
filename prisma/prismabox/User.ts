import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    email: t.String(),
    password: t.String(),
    avatarUrl: __nullable__(t.String()),
    role: t.Union([t.Literal("Admin"), t.Literal("User")], {
      additionalProperties: false,
    }),
    organizationId: __nullable__(t.String()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const UserRelations = t.Object(
  {
    organization: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const UserPlainInputCreate = t.Object(
  {
    name: t.String(),
    email: t.String(),
    password: t.String(),
    avatarUrl: t.Optional(__nullable__(t.String())),
    role: t.Optional(
      t.Union([t.Literal("Admin"), t.Literal("User")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const UserPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    email: t.Optional(t.String()),
    password: t.Optional(t.String()),
    avatarUrl: t.Optional(__nullable__(t.String())),
    role: t.Optional(
      t.Union([t.Literal("Admin"), t.Literal("User")], {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const UserRelationsInputCreate = t.Object(
  {
    organization: t.Optional(
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

export const UserRelationsInputUpdate = t.Partial(
  t.Object(
    {
      organization: t.Partial(
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

export const UserWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          email: t.String(),
          password: t.String(),
          avatarUrl: t.String(),
          role: t.Union([t.Literal("Admin"), t.Literal("User")], {
            additionalProperties: false,
          }),
          organizationId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "User" },
  ),
);

export const UserWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), email: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ email: t.String() })],
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
              name: t.String(),
              email: t.String(),
              password: t.String(),
              avatarUrl: t.String(),
              role: t.Union([t.Literal("Admin"), t.Literal("User")], {
                additionalProperties: false,
              }),
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
  { $id: "User" },
);

export const UserSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      email: t.Boolean(),
      password: t.Boolean(),
      avatarUrl: t.Boolean(),
      role: t.Boolean(),
      organization: t.Boolean(),
      organizationId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserInclude = t.Partial(
  t.Object(
    { role: t.Boolean(), organization: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const UserOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      password: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      avatarUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const User = t.Composite([UserPlain, UserRelations], {
  additionalProperties: false,
});

export const UserInputCreate = t.Composite(
  [UserPlainInputCreate, UserRelationsInputCreate],
  { additionalProperties: false },
);

export const UserInputUpdate = t.Composite(
  [UserPlainInputUpdate, UserRelationsInputUpdate],
  { additionalProperties: false },
);
