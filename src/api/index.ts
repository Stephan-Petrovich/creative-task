import { IPost, IUser, IComment } from "@src/domains/types";
import { BASE_URL, Endpoints } from "@src/utils/constants";

const fullUrlOfPosts: string = `${BASE_URL}/${Endpoints.POSTS}`;
const fullUrlOfUsers: string = `${BASE_URL}/${Endpoints.USERS}`;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class HttpClient {
    private async request<T>(url: string, method: HttpMethod, body?: any) {
        const config: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (method === "DELETE") {
            return undefined as T;
        }

        const data = response.json();

        return data as T;
    }

    public async get<T>(url: string): Promise<T> {
        return this.request<T>(url, "GET");
    }

    public async post<T>(url: string, body: any): Promise<T> {
        return this.request<T>(url, "POST", body);
    }

    public async patch<T>(url: string, body: any): Promise<T> {
        return this.request<T>(url, "PATCH", body);
    }

    public async delete<T>(url: string): Promise<T> {
        return this.request<T>(url, "DELETE");
    }
}

const httpClient = new HttpClient();

export const fetchPosts = async (): Promise<IPost[]> => {
    return httpClient.get<IPost[]>(fullUrlOfPosts);
};

export const fetchUsers = async (): Promise<IUser[]> => {
    return httpClient.get<IUser[]>(fullUrlOfUsers);
};

export const getPostById = async (id: number): Promise<IPost> => {
    const fullUrlOfDefinitPost: string = `${fullUrlOfPosts}/${id}`;

    return httpClient.get<IPost>(fullUrlOfDefinitPost);
};

export const getUserById = async (id: number): Promise<IUser> => {
    const fullUrlOfDefinitUser: string = `${fullUrlOfUsers}/${id}`;

    return httpClient.get<IUser>(fullUrlOfDefinitUser);
};

export const getCommentsById = async (id: number): Promise<IComment[]> => {
    const fullUrlOfDefinitPostComments: string = `${fullUrlOfPosts}/${id}/${Endpoints.COMMENTS}`;

    return httpClient.get<IComment[]>(fullUrlOfDefinitPostComments);
};

export const addNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string
) => {
    const fullUrlOfPostComments: string = `${fullUrlOfPosts}/${postId}/${Endpoints.COMMENTS}`;

    return httpClient.post<IComment>(fullUrlOfPostComments, {
        name,
        email,
        body,
    });
};

export const updatePost = async (
    id: number,
    postData: { title: string; body: string }
): Promise<IPost> => {
    const fullUrlOfDefinitePost: string = `${fullUrlOfPosts}/${id}`;

    return httpClient.patch<IPost>(fullUrlOfDefinitePost, postData);
};

export const deletePost = async (id: number) => {
    const fullUrlOfDefinitePost: string = `${fullUrlOfPosts}/${id}`;

    return httpClient.delete<void>(fullUrlOfDefinitePost);
};
