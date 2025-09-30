import Button from "../Button";
import Loading from "../Loading";
import PostCard from "../PostCard";
import usePagination from "@src/hooks/usePagination";
import useFilteredPosts from "@src/hooks/useFilteredPosts";
import { usePostContext } from "@src/Contexts/postsContext";
import { ReactElement } from "react";
import "./style.css";

interface IPostsListProps {
    searchQuery: string;
    selectedAuthor: string | null;
}

const FilteredPostsList = ({
    searchQuery,
    selectedAuthor,
}: IPostsListProps): ReactElement => {
    const { posts } = usePostContext();

    const { filteredPosts } = useFilteredPosts(
        posts,
        searchQuery,
        selectedAuthor
    );

    const { visiblePosts, handleLoadMore, isCanContinueList } =
        usePagination(filteredPosts);

    const isEmptyResults: boolean = visiblePosts.length === 0;

    if (isEmptyResults) {
        return (
            <div className="empty-list-message">
                No entry matching the entered title was found.
            </div>
        );
    }

    if (!posts) {
        return <Loading />;
    }

    return (
        <div className="posts-list-container">
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
                <div className="end-of-list">That's all</div>
            )}
        </div>
    );
};

export default FilteredPostsList;
