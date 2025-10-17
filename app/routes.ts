import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [

  layout("layouts/MainLayout.tsx", [
    index("pages/Home.tsx"),
  ]),

  layout("layouts/AuthLayout.tsx", [
    route("login", "pages/LoginPage.tsx",),
    route("/signup", "pages/SignUpPage.tsx"),  // Catch toutes les routes non matchées
  ]),



] satisfies RouteConfig;
