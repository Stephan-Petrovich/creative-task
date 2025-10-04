import PostsPage from "@src/pages/PostsPage";
import WelcomePage from "@src/pages/WelcomePage";
import DetailPostPage from "@src/pages/DetailPostPage";
import { UsersProvider } from "@src/Contexts/usersContext";
import { PostsProvider } from "@src/Contexts/postsContext";
import { ReactElement, ReactNode } from "react";
import { RouteObject } from "react-router-dom";

const Providers = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <UsersProvider>
            <PostsProvider>{children}</PostsProvider>
        </UsersProvider>
    );
};

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
        element: (
            <Providers>
                <PostsPage />
            </Providers>
        ),
    },
    {
        ...paths.DETAILPOSTPAGE,
        element: (
            <Providers>
                <DetailPostPage />
            </Providers>
        ),
    },
];

export default routes;
