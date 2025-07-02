import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import CreateGroup from "../pages/CreateGroup";
import ErrorPage from "../pages/ErrorPage";
import GroupDetails from "../pages/GroupDetails";
// import MyGroups from "../pages/MyGroups";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:3000/groups'),
                element: <Home></Home>
            },
            {
                path: '/allGroups',
                loader: () => fetch('http://localhost:3000/groups'),
                element: <AllGroups></AllGroups>
            },
            {
                path: '/createGroup',
                element: <CreateGroup></CreateGroup>
            },
            {
                path: '/groupDetails/:id',
                loader: ({params}) => fetch(`http://localhost:3000/groups/${params.id}`),
                element: <GroupDetails></GroupDetails>
            },
            {
                path: '/myGroups',
                // element: <MyGroups></MyGroups>
            },
        ]
    },
    {
        path: "/auth",
        element: <h2>auth</h2>,
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])

export default router;