export const defaultCountOfVisiblePosts: number = 10;

export const capitalizeFirstLetter = (text: string): string => {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const shuffleArraySimple = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const inputStyles = {
    width: "100%",
    maxWidth: "42.5rem",
    minWidth: "300px",
    margin: "0 auto",
};
