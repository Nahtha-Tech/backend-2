import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrganizationPlain = t.Object(
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
    planId: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const OrganizationRelations = t.Object(
  {
    users: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
    categories: t.Array(
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
      { additionalProperties: false },
    ),
    items: t.Array(
      t.Object(
        {
          id: t.String(),
          slug: t.String(),
          name: t.Any({ description: `[LocalString]` }),
          description: __nullable__(t.Any({ description: `[LocalString]` })),
          imageUrl: t.Array(t.String(), { additionalProperties: false }),
          basePrice: t.String(),
          variantGroups: __nullable__(
            t.Any({ description: `[ItemVariantGroup]` }),
          ),
          organizationId: t.String(),
          categoryId: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    medias: t.Array(
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
      { additionalProperties: false },
    ),
    plan: __nullable__(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const OrganizationPlainInputCreate = t.Object(
  {
    name: t.Any({ description: `[LocalString]` }),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    phoneNumber: t.Optional(__nullable__(t.String())),
    email: t.Optional(__nullable__(t.String())),
    googleMapsLink: t.Optional(__nullable__(t.String())),
    socialMedia: t.Array(t.Any({ description: `[SocialMediaLink]` }), {
      additionalProperties: false,
    }),
    slug: t.String(),
    logoImgUrl: t.Optional(__nullable__(t.String())),
    menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
      additionalProperties: false,
    }),
  },
  { additionalProperties: false },
);

export const OrganizationPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.Any({ description: `[LocalString]` })),
    description: t.Optional(
      __nullable__(t.Any({ description: `[LocalString]` })),
    ),
    phoneNumber: t.Optional(__nullable__(t.String())),
    email: t.Optional(__nullable__(t.String())),
    googleMapsLink: t.Optional(__nullable__(t.String())),
    socialMedia: t.Optional(
      t.Array(t.Any({ description: `[SocialMediaLink]` }), {
        additionalProperties: false,
      }),
    ),
    slug: t.Optional(t.String()),
    logoImgUrl: t.Optional(__nullable__(t.String())),
    menuStructure: t.Optional(
      t.Array(t.Any({ description: `[menuStructure]` }), {
        additionalProperties: false,
      }),
    ),
  },
  { additionalProperties: false },
);

export const OrganizationRelationsInputCreate = t.Object(
  {
    users: t.Optional(
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
    categories: t.Optional(
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
    items: t.Optional(
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
    medias: t.Optional(
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
    plan: t.Optional(
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

export const OrganizationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      users: t.Partial(
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
      categories: t.Partial(
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
      items: t.Partial(
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
      medias: t.Partial(
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
      plan: t.Partial(
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

export const OrganizationWhere = t.Partial(
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
          phoneNumber: t.String(),
          email: t.String(),
          googleMapsLink: t.String(),
          socialMedia: t.Array(t.Any({ description: `[SocialMediaLink]` }), {
            additionalProperties: false,
          }),
          slug: t.String(),
          logoImgUrl: t.String(),
          menuStructure: t.Array(t.Any({ description: `[menuStructure]` }), {
            additionalProperties: false,
          }),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          planId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Organization" },
  ),
);

export const OrganizationWhereUnique = t.Recursive(
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
              name: t.Any({ description: `[LocalString]` }),
              description: t.Any({ description: `[LocalString]` }),
              phoneNumber: t.String(),
              email: t.String(),
              googleMapsLink: t.String(),
              socialMedia: t.Array(
                t.Any({ description: `[SocialMediaLink]` }),
                { additionalProperties: false },
              ),
              slug: t.String(),
              logoImgUrl: t.String(),
              menuStructure: t.Array(
                t.Any({ description: `[menuStructure]` }),
                { additionalProperties: false },
              ),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              planId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Organization" },
);

export const OrganizationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      phoneNumber: t.Boolean(),
      email: t.Boolean(),
      googleMapsLink: t.Boolean(),
      socialMedia: t.Boolean(),
      slug: t.Boolean(),
      logoImgUrl: t.Boolean(),
      users: t.Boolean(),
      categories: t.Boolean(),
      items: t.Boolean(),
      menuStructure: t.Boolean(),
      medias: t.Boolean(),
      plan: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      planId: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const OrganizationInclude = t.Partial(
  t.Object(
    {
      users: t.Boolean(),
      categories: t.Boolean(),
      items: t.Boolean(),
      medias: t.Boolean(),
      plan: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const OrganizationOrderBy = t.Partial(
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
      phoneNumber: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      email: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      googleMapsLink: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      socialMedia: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      logoImgUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      menuStructure: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      planId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Organization = t.Composite(
  [OrganizationPlain, OrganizationRelations],
  { additionalProperties: false },
);

export const OrganizationInputCreate = t.Composite(
  [OrganizationPlainInputCreate, OrganizationRelationsInputCreate],
  { additionalProperties: false },
);

export const OrganizationInputUpdate = t.Composite(
  [OrganizationPlainInputUpdate, OrganizationRelationsInputUpdate],
  { additionalProperties: false },
);
