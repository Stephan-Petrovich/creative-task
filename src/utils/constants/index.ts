export const DEFAULT_COUNT_OF_VISIBLE_POSTS: number = 10;

export const COUNT_OF_TEXTAREA_COLS: number = 60;

export const INPUT_RESPONSE_TIMER: number = 300;

export const BASE_URL: string = "https://jsonplaceholder.typicode.com";

export enum Endpoints {
    POSTS = "posts",
    USERS = "users",
    COMMENTS = "comments",
}

export const capitalizeFirstLetter = (text: string): string => {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const shuffleArraySimple = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const INPUT_STYLES = {
    width: "100%",
    maxWidth: "42.5rem",
    minWidth: "300px",
    margin: "0 auto",
};
