import { t } from "elysia";

export const createUserBodySchema = t.Object({
  name: t.String({
    minLength: 2,
    maxLength: 50,
    description: "User full name",
    examples: ["Omar Chatin"],
  }),
  email: t.String({
    format: "email",
    description: "User email address",
    examples: ["omerchetin19@gmail.com"],
  }),
  password: t.String({
    minLength: 6,
    maxLength: 100,
    description: "Password (6–100 characters)",
    examples: ["123456789"],
  }),
  avatarUrl: t.Optional(
    t.String({
      format: "uri",
      description: "User avatar URL",
      examples: ["https://example.com/avatar.jpg"],
    })
  ),
  role: t.Optional(
    t.Union([t.Literal("Admin"), t.Literal("User")], {
      description: "User role",
      default: "User",
    })
  ),
});

export const updateUserBodySchema = t.Object({
  name: t.Optional(
    t.String({
      minLength: 2,
      maxLength: 50,
      description: "User full name",
      examples: ["Omar Chatin"],
    })
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email address",
      examples: ["omerchetin19@gmail.com"],
    })
  ),
  password: t.Optional(
    t.String({
      minLength: 6,
      maxLength: 100,
      description: "New password (6–100 characters)",
      examples: ["123456789"],
    })
  ),
  avatarUrl: t.Optional(
    t.String({
      format: "uri",
      description: "User avatar URL",
      examples: ["https://example.com/avatar.jpg"],
    })
  ),
  role: t.Optional(
    t.Union([t.Literal("Admin"), t.Literal("User")], {
      description: "User role",
    })
  ),
});

export const assignUserToOrgBodySchema = t.Object({
  organizationId: t.String({
    format: "uuid",
    description: "Organization ID to assign user to",
  }),
});
