import { rateLimit } from "elysia-rate-limit";

export const forgotPasswordLimit = rateLimit({
  max: 2,
  duration: 7 * 24 * 60 * 60 * 1000,
  generator: (request, server) => {
    const body = request.body as { email?: string };
    return body.email || request.headers.get("x-forwarded-for") || "unknown";
  },
});

export const authRoutesRateLimit = rateLimit({
  max: 10,
  duration: 60 * 60 * 24,
});
