import { IPost, IUser, IComment } from "@src/domains/types";
import { BASE_URL, Endpoints } from "@src/utils/constants";

const fullUrlOfPosts: string = `${BASE_URL}/${Endpoints.POSTS}`;
const fullUrlOfUsers: string = `${BASE_URL}/${Endpoints.USERS}`;
const fullUrlOfComments: string = `${BASE_URL}/${Endpoints.COMMENTS}`;

export const fetchPosts = async (): Promise<IPost[]> => {
    const response = await fetch(fullUrlOfPosts);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    const data = await response.json();
    return data;
};

export const fetchUsers = async (): Promise<IUser[]> => {
    const response = await fetch(fullUrlOfUsers);

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
    const fullUrlOfDefinitPost: string = `${fullUrlOfPosts}/${id}`;

    const response = await fetch(fullUrlOfDefinitPost);

    if (!response.ok) {
        throw new Error("Failed to fetch concrete post");
    }

    const data = await response.json();
    return data;
};

export const getUserById = async (id: number): Promise<IUser> => {
    const fullUrlOfDefinitUser: string = `${fullUrlOfUsers}/${id}`;

    const response = await fetch(fullUrlOfDefinitUser);

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
    const fullUrlOfDefinitPostComments: string = `${fullUrlOfPosts}/${id}/${Endpoints.COMMENTS}`;

    const response = await fetch(fullUrlOfDefinitPostComments);

    if (!response.ok) {
        throw new Error("Failed to load concrete comments");
    }

    const data = await response.json();
    return data;
};

export const addNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string
) => {
    const response = await fetch(fullUrlOfComments, {
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
    });

    if (!response.ok) {
        throw new Error("Failed to add comment");
    }

    const data = response.json();
    return data;
};

export const updatePost = async (
    id: number,
    postData: { title: string; body: string }
): Promise<IPost> => {
    const fullUrlOfDefinitePost: string = `${fullUrlOfPosts}/${id}`;

    const response = await fetch(fullUrlOfDefinitePost, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });

    if (!response.ok) {
        throw new Error("Failed to update post");
    }

    const data = response.json();
    return data;
};

export const deletePost = async (id: number) => {
    const fullUrlOfDefinitePost: string = `${fullUrlOfPosts}/${id}`;

    const response = await fetch(fullUrlOfDefinitePost, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }
};
