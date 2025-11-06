import Elysia from "elysia";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";
import { adminOrgRoutes } from "./admin (org)/route";
import { businessCategoryRoutes } from "./business (category)/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminUserRoutes)
  .use(adminOrgRoutes)
  .use(businessCategoryRoutes);

export default AllRoutes;
