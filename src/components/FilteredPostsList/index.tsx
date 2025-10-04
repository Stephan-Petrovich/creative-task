import Button from "../Button";
import PostCard from "../PostCard";
import usePagination from "@src/hooks/usePagination";
import useFilteredPosts from "@src/hooks/useFilteredPosts";
import { IPost } from "@src/domains/types";
import { ReactElement } from "react";
import "./style.css";

interface IPostsListProps {
    posts: IPost[];
    searchQuery: string;
    selectedOptionLabel: string | null;
}

const FilteredPostsList = ({
    posts,
    searchQuery,
    selectedOptionLabel,
}: IPostsListProps): ReactElement => {
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
