export interface IInitialPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IFinalPost {
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
