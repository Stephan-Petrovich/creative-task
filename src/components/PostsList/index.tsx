import Button from "../Button";
import PostCard from "../PostCard";
import { defaultCountOfVisiblePosts } from "@src/utils/constants";
import { usePostContext } from "@src/Contexts/postsContext";
import { ReactElement, useState } from "react";
import "./style.css";

const PostsList = (): ReactElement => {
    const { posts } = usePostContext();

    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(
        defaultCountOfVisiblePosts
    );

    const visiblePosts = posts.slice(0, visiblePostsCount);

    const isCanContinueList = visiblePostsCount < posts.length;

    const handleLoadMore = (): void => {
        setVisiblePostsCount(
            (prevCount) => prevCount + defaultCountOfVisiblePosts
        );
    };

    return (
        <div>
            <div className="posts-list">
                {visiblePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {isCanContinueList ? (
                <div className="load-more-container">
                    <Button label="Show more" onClick={handleLoadMore} />
                </div>
            ) : (
                <div className="end-of-list">You have viewed all posts</div>
            )}
        </div>
    );
};

export default PostsList;
