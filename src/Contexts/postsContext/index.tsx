import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useMemo,
    useContext,
} from "react";
import { shuffleArraySimple } from "@src/utils/constants";
import { useUsersContext } from "../usersContext";
import { IPost } from "@src/domains/types";
import { fetchPosts } from "@src/api";

interface IPostContext {
    posts: IPost[];
    removePost: (postId: number) => void;
}

const PostsContext = createContext<IPostContext>({
    posts: [],
    removePost: () => {},
});

const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { usersMap } = useUsersContext();

    const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);

    const postsWithAuthor = useMemo(() => {
        if (!usersMap || !originalPosts) {
            return [];
        }
        return originalPosts.map((post) => {
            const author = usersMap.get(post.userId);

            return { ...post, userName: author };
        });
    }, [originalPosts, usersMap]);

    const removePost = (postId: number): void => {
        setOriginalPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
    };

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                const mixedPosts = shuffleArraySimple(fetchedPosts);
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
