
export function getSentenceCutter(sentenceLength: number = 5, removeCharacters = { regExp: /\s+\-/g, value: "" }) {
    return (value: string) => {
        const valueAsArray = value.split(" ").slice(0, sentenceLength);
        let joinedValue = valueAsArray.join(" ")
        if (removeCharacters) {
            const { regExp, value } = removeCharacters;
            joinedValue = joinedValue.replace(regExp, value);
        }
        return joinedValue
    }
}

export function firstLetterUpperCase(word: string) {
    const firstLetterUpperCase = word.charAt(0).toUpperCase();
    return firstLetterUpperCase + word.substring(1)
}