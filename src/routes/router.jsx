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
import UpdateGroup from "../pages/UpdateGroup";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                index: true,
                loader: () => fetch('https://hobby-hub-server-psi-bay.vercel.app/groups'),
                element: <Home></Home>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/allGroups',
                loader: () => fetch('https://hobby-hub-server-psi-bay.vercel.app/groups'),
                element: <AllGroups></AllGroups>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/createGroup',
                element: <PrivateRoute>
                    <CreateGroup></CreateGroup>
                </PrivateRoute>
            },
            {
                path: '/groupDetails/:id',
                loader: ({ params }) => fetch(`https://hobby-hub-server-psi-bay.vercel.app/groups/${params.id}`),
                element:  <GroupDetails></GroupDetails>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/myGroups',
                element: <PrivateRoute>
                    <MyGroups></MyGroups>
                </PrivateRoute>,
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/updateGroup/:id',
                loader: ({ params }) => fetch(`https://hobby-hub-server-psi-bay.vercel.app/groups/${params.id}`),
                element: <PrivateRoute>
                    <UpdateGroup></UpdateGroup>
                </PrivateRoute>,
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
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
])

export default router;