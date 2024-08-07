import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { routeGenerator } from "../utils/routeGenerators";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyPaths),
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
