import { createBrowserRouter } from "react-router-dom";
import { PlanEditorPage } from "./pages/planEditorPage";
import { PlanViewerPage } from "./pages/planViewerPage";
import { PlanListPage } from "./pages/planListPage";

export const router = createBrowserRouter([
    {
    path:"/", element:<PlanListPage/>
},
{
    path:"/editor", element:<PlanEditorPage/>
},
{
    path:"/plan", element:<PlanViewerPage/>,
}
]);