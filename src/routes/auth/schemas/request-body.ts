import { t } from "elysia";

export const signupBodySchema = t.Object({
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
});

export const forgotPasswordBodySchema = t.Object({
  email: t.String({
    format: "email",
    description: "Email address to send reset link",
    examples: ["omerchetin19@gmail.com"],
  }),
});

export const resetPasswordBodySchema = t.Object({
  token: t.String({
    description: "Password reset token from email",
  }),
  newPassword: t.String({
    minLength: 6,
    maxLength: 100,
    description: "New password (6-100 characters)",
    examples: ["newpassword123"],
  }),
});

export const signinBodySchema = t.Object({
  email: t.String({
    format: "email",
    description: "Registered email",
    examples: ["omerchetin19@gmail.com"],
  }),
  password: t.String({
    minLength: 6,
    maxLength: 100,
    description: "User password",
    examples: ["123456789"],
  }),
});

export const updateProfileBodySchema = t.Object({
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
});
