
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