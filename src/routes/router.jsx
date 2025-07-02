import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AllGroups from "../pages/AllGroups";
import CreateGroup from "../pages/CreateGroup";
import ErrorPage from "../pages/ErrorPage";
import GroupDetails from "../pages/GroupDetails";
import MyGroups from "../pages/MyGroups";
import Login from "../components/Login";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/Register";
// import MyGroups from "../pages/MyGroups";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:3000/groups'),
                element: <Home></Home>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/allGroups',
                loader: () => fetch('http://localhost:3000/groups'),
                element: <AllGroups></AllGroups>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/createGroup',
                element: <CreateGroup></CreateGroup>
            },
            {
                path: '/groupDetails/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/groups/${params.id}`),
                element: <GroupDetails></GroupDetails>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/myGroups',
                loader: () => fetch(`http://localhost:3000/groups`),
                element: <MyGroups></MyGroups>,
                hydrateFallbackElement: <Loading></Loading>
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/auth/login',
                element:<Login></Login>
            },
            {
                path: '/auth/register',
                element:<Register></Register>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])

export default router;