import useDebounce from "@src/hooks/useDebounce";
import FilteredPostsList from "@src/components/FilteredPostsList";
import Input, { InputSizes, TypesOfInput } from "@src/components/Input";
import Select, { ISelectOption, SelectSizes } from "@src/components/Select";
import { INPUT_RESPONSE_TIMER, INPUT_STYLES } from "@src/utils/constants";
import { useUsersContext } from "@src/Contexts/usersContext";
import { ReactElement, useCallback, useState } from "react";
import "./style.css";

const PostsPage = (): ReactElement => {
    const { users } = useUsersContext();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
        null
    );

    const selectOptions: ISelectOption[] =
        users.map((user) => {
            return {
                value: user.id,
                label: user.username,
            };
        }) || [];

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

    return (
        <div className="posts-page-container">
            <header className="posts-page-header">All posts</header>
            <div className="posts-page-body">
                <div className="posts-page-list-container">
                    <FilteredPostsList
                        searchQuery={debouncedSearchQuery}
                        selectedAuthor={
                            selectedOption?.label
                                ? String(selectedOption.label)
                                : null
                        }
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
                    />
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
