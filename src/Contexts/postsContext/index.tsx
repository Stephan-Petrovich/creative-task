import {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
    ReactElement,
} from "react";
import { shuffleArray } from "@src/utils/constants";
import { useUsersContext } from "../usersContext";
import { IPost } from "@src/domains/types";
import { fetchPosts } from "@src/api";

interface IPostContext {
    posts: IPost[];
    removePost: (postId: number) => void;
}

interface PostsProviderProps {
    children: ReactNode;
}

const PostsContext = createContext<IPostContext>({
    posts: [],
    removePost: () => {},
});

const PostsProvider = ({ children }: PostsProviderProps): ReactElement => {
    const { usersMap } = useUsersContext();

    const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);

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
                const fetchedPosts = await fetchPosts();

                const mixedPosts = shuffleArray(fetchedPosts);

                setOriginalPosts(mixedPosts);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
            }
        };

        loadPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts: postsWithAuthor, removePost }}>
            {children}
        </PostsContext.Provider>
    );
};

const usePostContext = () => {
    const context = useContext(PostsContext);

    if (context === null) {
        throw new Error("usePostContext must be used within a PostsProvider");
    }

    return context;
};

export { PostsProvider, usePostContext };
