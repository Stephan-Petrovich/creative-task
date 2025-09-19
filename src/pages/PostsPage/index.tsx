import { ReactElement, useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "@src/api/index";
import { IPost, IUser } from "@domains/index";

const PostsPage = (): ReactElement => {
    const [posts, setPosts] = useState<IPost[] | null>(null);
    const [users, setUsers] = useState<IUser[] | null>(null);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const fetchedPosts = await fetchPosts();
                setPosts(fetchedPosts);
                console.log("Загруженные посты: ", fetchedPosts);
            } catch (error) {
                console.error("Ошибка загрузки постов:", error);
            }
        };

        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers();
                setUsers(fetchedUsers);
                console.log("Загруженные пользователи: ", fetchedUsers);
            } catch (error) {
                console.error("Ошибка загрузки пользователей:", error);
            }
        };

        loadPosts();
        loadUsers();
    }, []);

    return <h1 className="page-header">Welcome to Posts Page</h1>;
};

export default PostsPage;
