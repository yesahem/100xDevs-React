import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
const SignUp = lazy(() => import("./components/SignUp.jsx"));
const SignIn = lazy(() => import("./components/SignIn.jsx"));
const Send = lazy(() => import("./components/Send.jsx"));
const DashBoard = lazy(() => import("./components/DashBoard.jsx"));
const Index = lazy(() => import("./components/Index.jsx"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={"Loading Index..."}>
        <Index />
      </Suspense>
    ),
    children: [
      {
        path: "signup",
        element: (
          <Suspense fallback={"Loading SignUp Route"}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: "signin",
        element: (
          <Suspense fallback={"Loading SignIn Route"}>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "send",
        element: (
          <Suspense fallback={"Loading Send Route..."}>
            <Send />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={"Loading DashBoard Route ..."}>
            <DashBoard />
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
