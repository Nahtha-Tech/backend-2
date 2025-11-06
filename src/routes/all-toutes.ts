import Elysia from "elysia";
import { authRoutes } from "./auth/route";

const AllRoutes = new Elysia().use(authRoutes);

export default AllRoutes;
