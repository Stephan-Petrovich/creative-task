import { DEFAULT_COUNT_OF_VISIBLE_POSTS } from "@src/utils/constants";
import { IPost } from "@src/domains/types";
import { useState } from "react";

const usePagination = (filteredPosts: IPost[]) => {
    const [visiblePostsCount, setVisiblePostsCount] = useState<number>(
        DEFAULT_COUNT_OF_VISIBLE_POSTS
    );

    const visiblePosts = filteredPosts.slice(0, visiblePostsCount);

    const isCanContinueList: boolean = visiblePostsCount < filteredPosts.length;

    const handleLoadMore = (): void => {
        setVisiblePostsCount(
            (prevCount) => prevCount + DEFAULT_COUNT_OF_VISIBLE_POSTS
        );
    };

    return { visiblePosts, isCanContinueList, handleLoadMore };
};

export default usePagination;
