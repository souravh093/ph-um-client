import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import { adminRoutes } from "./admin.routes";


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
    children: adminRoutes
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
