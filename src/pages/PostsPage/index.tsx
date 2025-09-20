import PostsList from "@src/components/PostsList";
import { ReactElement } from "react";
import "./style.css";

const PostsPage = (): ReactElement => {
    return (
        <div className="posts-page-container">
            <header className="posts-page-header">All posts</header>
            <div className="page-body">
                <PostsList />
            </div>
        </div>
    );
};

export default PostsPage;
