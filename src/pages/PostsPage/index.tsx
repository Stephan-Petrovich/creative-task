import Error from "@src/components/Error";
import Loading from "@src/components/Loading";
import useDebounce from "@src/hooks/useDebounce";
import FilteredPostsList from "@src/components/FilteredPostsList";
import Input, { InputSizes, TypesOfInput } from "@src/components/Input";
import Select, { ISelectOption, SelectSizes } from "@src/components/Select";
import {
    INPUT_RESPONSE_TIMER,
    INPUT_STYLES,
    SELECT_STYLES,
} from "@src/utils/constants";
import { useUsersContext } from "@src/Contexts/usersContext";
import { usePostContext } from "@src/Contexts/postsContext";
import { ReactElement, useCallback, useState } from "react";
import "./style.css";

const PostsPage = (): ReactElement => {
    const { posts, isPostsLoading, errorLoadingPosts } = usePostContext();
    const { users, isUsersLoading, errorLoadingUsers } = useUsersContext();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
        null
    );

    const debouncedSetSearch = useDebounce((query: string) => {
        setDebouncedSearchQuery(query);
    }, INPUT_RESPONSE_TIMER);

    const handleSearchQuery = useCallback((query: string) => {
        setSearchQuery(query);

        debouncedSetSearch(query);
    }, []);

    const handleSelectOption = (selectedOption: ISelectOption): void => {
        setSelectedOption(selectedOption);
    };

    if (isPostsLoading || isUsersLoading) {
        return <Loading />;
    }

    if (errorLoadingPosts || errorLoadingUsers) {
        return (
            <Error label="Failed to load data. Please check your internet connection." />
        );
    }

    if (posts.length === 0) {
        return <Error label="No posts available. Please try again later." />;
    }

    const selectedOptionLabel =
        selectedOption && selectedOption.value !== null
            ? String(selectedOption.label)
            : null;

    const selectOptions: ISelectOption[] = [
        { value: null, label: "Without specific author" },
        ...users.map((user) => {
            return {
                value: user.id,
                label: user.username,
            };
        }),
    ];

    return (
        <div className="posts-page-container">
            <header className="posts-page-header">All posts</header>
            <div className="posts-page-body">
                <div className="posts-page-list-container">
                    <FilteredPostsList
                        posts={posts}
                        searchQuery={debouncedSearchQuery}
                        selectedOptionLabel={selectedOptionLabel}
                    />
                </div>

                <div className="page-list-redactor">
                    <Input
                        value={searchQuery}
                        placeholder="Find a comment by title..."
                        onChange={handleSearchQuery}
                        variant={TypesOfInput.PRIMARY}
                        size={InputSizes.MEDIUM}
                        autoComplete="off"
                        style={INPUT_STYLES}
                    />

                    <Select
                        options={selectOptions}
                        onChange={handleSelectOption}
                        placeholder="Select a filter by author"
                        size={SelectSizes.LARGE}
                        style={SELECT_STYLES}
                    />
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
