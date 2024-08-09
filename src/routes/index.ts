import Recipe from "routes/Recipe";
import Menu from "routes/Menu";
import Signin from "routes/Signin";

export const userRoutes = {
  "/:id": Recipe,
  "/": Menu,
};
export const guestRoutes = {
  "/:id": Recipe,
  "/": Signin,
};

const routes = {
  user: userRoutes,
  guest: guestRoutes,
};

export default routes;
