import Router from "@src/router/index";
import { PostsProvider } from "@src/Contexts/postsContext";
import { UsersProvider } from "@src/Contexts/usersContext";
import { ReactElement } from "react";
import "@src/Theme/style.css";

const App = (): ReactElement => {
    return (
        <UsersProvider>
            <PostsProvider>
                <Router />
            </PostsProvider>
        </UsersProvider>
    );
};

export default App;
