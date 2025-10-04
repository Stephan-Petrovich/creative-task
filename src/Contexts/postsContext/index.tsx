import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
    ReactElement,
} from "react";
import { shuffleArray } from "@src/utils/functions";
import { useUsersContext } from "../usersContext";
import { IPost } from "@src/domains/types";
import { fetchPosts } from "@src/api";

interface IPostContext {
    posts: IPost[];
    removePost: (postId: number) => void;
    isPostsLoading: boolean;
    errorLoadingPosts: string | null;
}

interface PostsProviderProps {
    children: ReactNode;
}

const PostsContext = createContext<IPostContext>({
    posts: [],
    removePost: () => {},
    isPostsLoading: false,
    errorLoadingPosts: null,
});

const PostsProvider = ({ children }: PostsProviderProps): ReactElement => {
    const { usersMap } = useUsersContext();

    const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getPostsWithAuthor = (
        posts: IPost[],
        usersMap: Map<number, string> | null
    ): IPost[] => {
        if (!usersMap || !originalPosts) {
            return [];
        }

        return posts.map((post) => {
            const author = usersMap.get(post.userId);

            return { ...post, userName: author };
        });
    };

    const postsWithAuthor = getPostsWithAuthor(originalPosts, usersMap);

    const removePost = (postId: number): void => {
        setOriginalPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                setIsLoading(true);

                const fetchedPosts = await fetchPosts();

                const mixedPosts = shuffleArray(fetchedPosts);

                setOriginalPosts(mixedPosts);
            } catch (error) {
                setError("Ошибка загрузки постов");
                console.error("Ошибка загрузки постов:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, []);

    return (
        <PostsContext.Provider
            value={{
                posts: postsWithAuthor,
                removePost,
                isPostsLoading: isLoading,
                errorLoadingPosts: error,
            }}
        >
            {children}
        </PostsContext.Provider>
    );
};

const usePostContext = () => {
    const context = useContext(PostsContext);

    if (context === undefined) {
        throw new Error("usePostContext must be used within a PostsProvider");
    }

    return context;
};

export { PostsProvider, usePostContext };
