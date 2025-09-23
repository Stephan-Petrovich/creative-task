import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useMemo,
    useContext,
} from "react";
import { useUsersContext } from "../usersContext";
import { fetchPosts } from "@src/api";
import { IPost } from "@src/domains";

interface IPostContext {
    posts: IPost[];
}

const PostsContext = createContext<IPostContext>({ posts: [] });

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

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setOriginalPosts(fetchedPosts);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
            }
        };

        loadPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts: postsWithAuthor }}>
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
