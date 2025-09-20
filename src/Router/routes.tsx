import DetailPostPage from "@src/pages/DetailPostPage";
import PostsPage from "@src/pages/PostsPage";
import WelcomePage from "@src/pages/WelcomePage";
import { RouteObject } from "react-router-dom";

export const paths = {
    WELCOMEPAGE: {
        id: "welcome",
        path: "/",
    },
    POSTSPAGE: {
        id: "posts",
        path: "/posts",
    },
    DETAILPOSTPAGE: {
        id: "detail-post",
        path: "/posts/:id",
    },
};

const routes: RouteObject[] = [
    {
        ...paths.WELCOMEPAGE,
        element: <WelcomePage />,
    },
    {
        ...paths.POSTSPAGE,
        element: <PostsPage />,
    },
    { ...paths.DETAILPOSTPAGE, element: <DetailPostPage /> },
];

export default routes;
