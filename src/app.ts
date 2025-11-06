import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import AllRoutes from "./routes/all-toutes";
import { rateLimit } from "elysia-rate-limit";
import { logger } from "@bogeychan/elysia-logger";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(
    cors({
      origin: true,
      credentials: true,
    })
  )
  .use(logger({}))
  .use(
    rateLimit({
      max: 50,
      duration: 60000,
    })
  )
  .onError(({ code, error }) => {
    if (code === "VALIDATION") {
      return {
        success: false,
        message: `Validation Error, ${error.all.map((i) => i.summary).join(", ")}`,
        data: null,
      };
    }
    if (code === "UNKNOWN") {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: errorMessage,
        data: null,
      };
    }
  })
  .use(
    openapi({
      documentation: {
        info: {
          title: "Multi tenant saas backend api design",
          version: "1.0.0",
          contact: {
            email: "omerchetin19@gmail.com",
            name: "omar chatin",
            url: "https://github.com/omer-os",
          },
          description:
            "Backend api documentation built for future saas with orgs branches and users.",
        },
      },

      path: "/docs",
      specPath: "/docs/json",
    })
  )

  .use(AllRoutes)
  .listen(process.env.PORT ?? 4321);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
