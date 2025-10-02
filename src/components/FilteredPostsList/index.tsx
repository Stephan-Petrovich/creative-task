import Error from "../Error";
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
    selectedOptionLabel: string | null;
}

const FilteredPostsList = ({
    searchQuery,
    selectedOptionLabel,
}: IPostsListProps): ReactElement => {
    const { posts, isLoading, error } = usePostContext();

    if (error) {
        return (
            <Error label="Failed to load posts. Please check your internet connection." />
        );
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!posts || posts.length === 0) {
        return <Error label="No posts available. Please try again later." />;
    }

    const { filteredPosts } = useFilteredPosts(
        posts,
        searchQuery,
        selectedOptionLabel
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
