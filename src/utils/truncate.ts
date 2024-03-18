export function truncateString(str: string, maxLength: number): string {
    const sentenceCase = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        if (sentenceCase.length > maxLength) {
        return sentenceCase.slice(0, maxLength) + "...";
    } else {
        return sentenceCase;
    }
};
