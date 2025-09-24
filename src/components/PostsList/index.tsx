import Button from "../Button";
import PostCard from "../PostCard";
import { defaultCountOfVisiblePosts } from "@src/utils/constants";
import { usePostContext } from "@src/Contexts/postsContext";
import { ReactElement, ReactNode, useState } from "react";
import { IPost } from "@src/domains";
import "./style.css";

interface IPostsListProps {
    searchQuery: string;
    selectedAuthor: ReactNode;
}

const PostsList = ({
    searchQuery,
    selectedAuthor,
}: IPostsListProps): ReactElement => {
    const { posts } = usePostContext();

    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(
        defaultCountOfVisiblePosts
    );

    const allPosts = posts.slice(0, visiblePostsCount);

    const isActiveAnyFilters: boolean =
        searchQuery.length > 0 ||
        (selectedAuthor !== null && selectedAuthor !== undefined);

    const filteredPosts: IPost[] = isActiveAnyFilters
        ? posts.filter((post: IPost) => {
              const isMatchesQuery: boolean = post.title
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
              const isMatchesAuthor: boolean = selectedAuthor
                  ? post.userName === selectedAuthor
                  : true;
              return isMatchesQuery && isMatchesAuthor;
          })
        : allPosts;

    const isCanContinueList: boolean = visiblePostsCount < posts.length;
    const isEmptyResults: boolean = filteredPosts.length === 0;

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

            {!isActiveAnyFilters && isCanContinueList ? (
                <div className="load-more-container">
                    <Button label="Show more" onClick={handleLoadMore} />
                </div>
            ) : (
                !isActiveAnyFilters &&
                filteredPosts.length > 0 && (
                    <div className="end-of-list">You have viewed all posts</div>
                )
            )}
        </div>
    );
};

export default PostsList;
