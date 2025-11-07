import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
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
);

export const PaymentRelations = t.Object(
  {
    subscription: t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentPlainInputCreate = t.Object(
  {
    amount: t.Integer(),
    paidAt: t.Optional(t.Date()),
    periodStart: t.Date(),
    periodEnd: t.Date(),
    notes: t.Optional(__nullable__(t.String())),
    imageUrl: t.Optional(__nullable__(t.String())),
    waylStatus: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Integer()),
    paidAt: t.Optional(t.Date()),
    periodStart: t.Optional(t.Date()),
    periodEnd: t.Optional(t.Date()),
    notes: t.Optional(__nullable__(t.String())),
    imageUrl: t.Optional(__nullable__(t.String())),
    waylStatus: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputCreate = t.Object(
  {
    subscription: t.Object(
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

export const PaymentRelationsInputUpdate = t.Partial(
  t.Object(
    {
      subscription: t.Object(
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

export const PaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          amount: t.Integer(),
          paidAt: t.Date(),
          periodStart: t.Date(),
          periodEnd: t.Date(),
          notes: t.String(),
          imageUrl: t.String(),
          waylReferenceId: t.String(),
          waylLinkId: t.String(),
          waylStatus: t.String(),
          isPaid: t.Boolean(),
          subscriptionId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Payment" },
  ),
);

export const PaymentWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              waylReferenceId: t.String(),
              waylLinkId: t.String(),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ waylReferenceId: t.String() }),
            t.Object({ waylLinkId: t.String() }),
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
              amount: t.Integer(),
              paidAt: t.Date(),
              periodStart: t.Date(),
              periodEnd: t.Date(),
              notes: t.String(),
              imageUrl: t.String(),
              waylReferenceId: t.String(),
              waylLinkId: t.String(),
              waylStatus: t.String(),
              isPaid: t.Boolean(),
              subscriptionId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Payment" },
);

export const PaymentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      amount: t.Boolean(),
      paidAt: t.Boolean(),
      periodStart: t.Boolean(),
      periodEnd: t.Boolean(),
      notes: t.Boolean(),
      imageUrl: t.Boolean(),
      waylReferenceId: t.Boolean(),
      waylLinkId: t.Boolean(),
      waylStatus: t.Boolean(),
      isPaid: t.Boolean(),
      subscription: t.Boolean(),
      subscriptionId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentInclude = t.Partial(
  t.Object(
    { subscription: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const PaymentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paidAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      periodStart: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      periodEnd: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      notes: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      waylReferenceId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      waylLinkId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      waylStatus: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isPaid: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      subscriptionId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Payment = t.Composite([PaymentPlain, PaymentRelations], {
  additionalProperties: false,
});

export const PaymentInputCreate = t.Composite(
  [PaymentPlainInputCreate, PaymentRelationsInputCreate],
  { additionalProperties: false },
);

export const PaymentInputUpdate = t.Composite(
  [PaymentPlainInputUpdate, PaymentRelationsInputUpdate],
  { additionalProperties: false },
);
