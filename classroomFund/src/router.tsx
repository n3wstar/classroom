import { createBrowserRouter, Navigate } from "react-router-dom";
import { PlanEditorPage } from "./pages/planEditorPage";
import { PlanViewerPage } from "./pages/planViewerPage";
import { PlanListPage } from "./pages/planListPage";
import { LoginPage } from "./pages/loginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/plans",
    element: <PlanListPage />,
  },
  {
    path: "/editor",
    element: <PlanEditorPage />,
  },
  {
    path: "/plans/viewer",
    element: <PlanViewerPage />,
  }
]);