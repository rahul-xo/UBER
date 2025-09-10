import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LoginUser from "./Pages/LoginUser.jsx";
import RegisterUser from "./Pages/RegisterUser.jsx";
import LoginCaptain from "./Pages/LoginCaptain.jsx";
import RegisterCaptain from "./Pages/RegisterCaptain.jsx";
import Start from "./Pages/Start.jsx";
import UserContext from "./Context/UserContext.jsx";
import UserProtectWrapper from "./Pages/UserProtectWrapper.jsx";
import UserLogout from "./Pages/UserLogout.jsx";
import CaptainContext from "./Context/captainContext.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
      {
        path: "/home",
        element: (
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        ),
      },
      {
        path: "/loginUser",
        element: <LoginUser />,
      },
      {
        path: "/registerUser",
        element: <RegisterUser />,
      },
      {
        path: "loginCaptain",
        element: <LoginCaptain />,
      },
      {
        path: "/registerCaptain",
        element: <RegisterCaptain />,
      },
      {
        path: "/user/logout",
        element: <UserLogout />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CaptainContext>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </CaptainContext>
  </StrictMode>
);
