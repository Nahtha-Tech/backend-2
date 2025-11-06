import Elysia from "elysia";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";
import { adminOrgRoutes, waylWebhookRoute } from "./admin (org)/route";
import { businessCategoryRoutes } from "./business (category)/route";
import { businessItemRoutes } from "./business (items)/route";
import { mediaRoutes } from "./media/route";
import { businessOrgRoutes } from "./business (org)/route";
import { adminPlanRoutes } from "./admin (plan)/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminUserRoutes)
  .use(adminOrgRoutes)
  .use(adminPlanRoutes)
  .use(businessCategoryRoutes)
  .use(businessItemRoutes)
  .use(mediaRoutes)
  .use(businessOrgRoutes)
  .use(waylWebhookRoute);

export default AllRoutes;
