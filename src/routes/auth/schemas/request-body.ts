import { t } from "elysia";

export const signupBody = t.Object({
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
    }),
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

export const signinBody = t.Object({
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

export const switchOrgBody = t.Object({
  organizationSlug: t.String({
    description: "Target organization Slug",
    examples: ["omaro-llc"],
  }),
});

export const switchBranchBody = t.Object({
  branchSlug: t.String({
    description: "Target branch slug",
    examples: ["omaro-llc"],
  }),
});
export const updateProfileBody = t.Object({
  name: t.Optional(
    t.String({
      minLength: 2,
      maxLength: 50,
      description: "User full name",
      examples: ["Omar Chatin"],
    }),
  ),
  email: t.Optional(
    t.String({
      format: "email",
      description: "User email address",
      examples: ["omerchetin19@gmail.com"],
    }),
  ),
  password: t.Optional(
    t.String({
      minLength: 6,
      maxLength: 100,
      description: "New password (6–100 characters)",
      examples: ["123456789"],
    }),
  ),
  avatarUrl: t.Optional(
    t.String({
      format: "uri",
      description: "User avatar URL",
      examples: ["https://example.com/avatar.jpg"],
    }),
  ),
});

export type UpdateProfileBody = typeof updateProfileBody.static;
export type SignupBody = typeof signupBody.static;
export type SigninBody = typeof signinBody.static;
export type SwitchOrgBody = typeof switchOrgBody.static;
export type SwitchBranchBody = typeof switchBranchBody.static;
