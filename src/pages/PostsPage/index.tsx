import PostsList from "@src/components/PostsList";
import Select, { ISelectOption, SelectSizes } from "@src/components/Select";
import Input, { InputSizes, TypesOfInput } from "@src/components/Input";
import { useUsersContext } from "@src/Contexts/usersContext";
import { inputStyles } from "@src/utils/constants";
import { ReactElement, useState } from "react";
import "./style.css";
import useDebounce from "@src/hooks/useDebaunce";

const PostsPage = (): ReactElement => {
    const { users } = useUsersContext();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<ISelectOption | null>(
        null
    );
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");

    const selectOptions: ISelectOption[] =
        users.map((user) => {
            return {
                value: user.id,
                label: user.username,
            };
        }) || [];

    const debouncedSetSearch = useDebounce((query: string) => {
        setDebouncedSearchQuery(query);
    }, 300);

    const handleSearchQuery = (query: string) => {
        setSearchQuery(query);
        debouncedSetSearch(query);
    };

    const handleSelectOption = (selectedOption: ISelectOption): void => {
        setSelectedOption(selectedOption);
    };

    return (
        <div className="posts-page-container">
            <header className="posts-page-header">All posts</header>
            <div className="posts-page-body">
                <div className="posts-page-list-container">
                    <PostsList
                        searchQuery={debouncedSearchQuery}
                        selectedAuthor={selectedOption?.label}
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
                        style={inputStyles}
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
