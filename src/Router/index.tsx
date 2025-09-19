import PostsPage from "@pages/PostsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReactElement } from "react";

const Router = (): ReactElement => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PostsPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
