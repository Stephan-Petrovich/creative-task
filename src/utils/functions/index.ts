export const capitalizeFirstLetter = (text: string): string => {
    if (!text) {
        return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const shuffleArray = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};
