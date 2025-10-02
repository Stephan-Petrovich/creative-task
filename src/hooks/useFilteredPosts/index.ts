import { IPost } from "@src/domains/types";

const useFilteredPosts = (
    posts: IPost[],
    searchQuery: string,
    selectedOptionLabel: string | null
) => {
    const noActiveFilters: boolean =
        searchQuery.length === 0 && selectedOptionLabel === null;

    if (noActiveFilters) {
        return { filteredPosts: posts };
    }

    const filteredPosts: IPost[] = posts.filter((post) => {
        const matchesSearch =
            searchQuery.length === 0
                ? true
                : post.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesAuthor =
            selectedOptionLabel === null
                ? true
                : post.userName === selectedOptionLabel;

        return matchesSearch && matchesAuthor;
    });
    return { filteredPosts };
};

export default useFilteredPosts;
