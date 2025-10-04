import { IPost, IUser, IComment } from "@src/domains/types";
import { BASE_URL, Endpoints } from "@src/utils/constants";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class HttpClient {
    private async request<T>(url: string, method: HttpMethod, body?: any) {
        const fullUrlOfRequest: string = `${BASE_URL}/${url}`;

        const config: RequestInit = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(fullUrlOfRequest, config);

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
    return httpClient.get<IPost[]>(Endpoints.POSTS);
};

export const fetchUsers = async (): Promise<IUser[]> => {
    return httpClient.get<IUser[]>(Endpoints.USERS);
};

export const getPostById = async (id: number): Promise<IPost> => {
    const urlOfDefinitPost: string = `${Endpoints.POSTS}/${id}`;

    return httpClient.get<IPost>(urlOfDefinitPost);
};

export const getUserById = async (id: number): Promise<IUser> => {
    const urlOfDefinitUser: string = `${Endpoints.USERS}/${id}`;

    return httpClient.get<IUser>(urlOfDefinitUser);
};

export const getCommentsById = async (id: number): Promise<IComment[]> => {
    const urlOfDefinitPostComments: string = `${Endpoints.POSTS}/${id}/${Endpoints.COMMENTS}`;

    return httpClient.get<IComment[]>(urlOfDefinitPostComments);
};

export const addNewComment = async (
    postId: number,
    name: string,
    email: string,
    body: string
) => {
    const urlOfPostComments: string = `${Endpoints.POSTS}/${postId}/${Endpoints.COMMENTS}`;

    return httpClient.post<IComment>(urlOfPostComments, {
        name,
        email,
        body,
    });
};

export const updatePost = async (
    id: number,
    postData: { title: string; body: string }
): Promise<IPost> => {
    const urlOfDefinitePost: string = `${Endpoints.POSTS}/${id}`;

    return httpClient.patch<IPost>(urlOfDefinitePost, postData);
};

export const deletePost = async (id: number) => {
    const urlOfDefinitePost: string = `${Endpoints.POSTS}/${id}`;

    return httpClient.delete<void>(urlOfDefinitePost);
};
