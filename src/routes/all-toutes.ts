import Elysia from "elysia";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";
import { adminOrgRoutes } from "./admin (org)/route";

const AllRoutes = new Elysia()
  .use(authRoutes)
  .use(adminUserRoutes)
  .use(adminOrgRoutes);

export default AllRoutes;
