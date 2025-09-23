import Button from "../Button";
import PostCard from "../PostCard";
import { defaultCountOfVisiblePosts } from "@src/utils/constants";
import { usePostContext } from "@src/Contexts/postsContext";
import { ReactElement, useState } from "react";
import { ISelectOption } from "../Select";
import "./style.css";

interface IPostsListProps {
    searchQuery: string;
    selectedOption: ISelectOption | null;
}

const PostsList = ({ searchQuery }: IPostsListProps): ReactElement => {
    const { posts } = usePostContext();

    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(
        defaultCountOfVisiblePosts
    );

    const allPosts = posts.slice(0, visiblePostsCount);

    const filteredPosts = searchQuery
        ? posts.filter((post) => {
              const matchingQuery = post.title
                  .toLowerCase()
                  .startsWith(searchQuery.toLowerCase());
              return matchingQuery;
          })
        : allPosts;

    const isCanContinueList = visiblePostsCount < posts.length;
    const isEmptyResults = searchQuery && filteredPosts.length === 0;
    const hasSearchQuery = searchQuery.length > 0;

    const handleLoadMore = (): void => {
        setVisiblePostsCount(
            (prevCount) => prevCount + defaultCountOfVisiblePosts
        );
    };

    if (isEmptyResults) {
        return (
            <div className="empty-list-message">
                No entry matching the entered title was found.
            </div>
        );
    }

    return (
        <div className="posts-list-container">
            <div className="posts-list">
                {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {!hasSearchQuery && isCanContinueList ? (
                <div className="load-more-container">
                    <Button label="Show more" onClick={handleLoadMore} />
                </div>
            ) : (
                !hasSearchQuery &&
                filteredPosts.length > 0 && (
                    <div className="end-of-list">You have viewed all posts</div>
                )
            )}
        </div>
    );
};

export default PostsList;
