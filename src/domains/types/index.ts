export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
    userName: string | undefined;
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
