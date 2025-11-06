import Elysia from "elysia";
import { authRoutes } from "./auth/route";
import { adminUserRoutes } from "./admin (user)/route";

const AllRoutes = new Elysia().use(authRoutes).use(adminUserRoutes);

export default AllRoutes;
