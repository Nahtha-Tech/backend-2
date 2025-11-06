import Elysia from "elysia";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";
import { adminOrgRoutes } from "./admin (org)/route";
import { businessCategoryRoutes } from "./business (category)/route";
import { businessItemRoutes } from "./business (items)/route";
import { mediaRoutes } from "./media/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminUserRoutes)
  .use(adminOrgRoutes)
  .use(businessCategoryRoutes)
  .use(businessItemRoutes)
  .use(mediaRoutes);

export default AllRoutes;
