export const countOfFetchingPosts: number = 50;
export const defaultCountOfVisiblePosts: number = 10;

export const capitalizeFirstLetter = (text: string): string => {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
