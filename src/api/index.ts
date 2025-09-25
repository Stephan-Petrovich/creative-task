import { IPost, IUser, IComment } from "@src/domains";

export const fetchPosts = async (): Promise<IPost[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }
    const data = await response.json();
    return data;
};

export const fetchUsers = async (): Promise<IUser[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data.map((user: any) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
    }));
};

export const getPostById = async (id: number): Promise<IPost> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch concrete post");
    }
    const data = await response.json();
    return data;
};

export const getUserById = async (id: number): Promise<IUser> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
        throw new Error("Failed to load concrete user");
    }
    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
    };
};

export const getCommentsById = async (id: number): Promise<IComment[]> => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
    if (!response.ok) {
        throw new Error("Failed to load concrete comments");
    }
    const data = await response.json();
    return data;
};

export const fetchNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string
) => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId,
                name: name.trim(),
                email: email.trim(),
                body: body.trim(),
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add comment");
    }

    const data = response.json();
    return data;
};
