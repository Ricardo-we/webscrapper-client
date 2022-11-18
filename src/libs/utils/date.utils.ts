

export function safeDateParse(date?: string | Date | null): Date {
    try {
        return new Date(date || new Date());
    } catch (error) {
        console.error(error)
        return new Date();
    }
}

export function getISODateTime(date?: string | Date | null): string {
    try {

        return safeDateParse(date)?.toISOString();
    } catch (error) {
        return safeDateParse().toISOString();
    }
}

export function getISODate(date?: string | Date | null): string {
    return getISODateTime(date).split("T")[0]
}


export function getLocalDateFromString(date?: string | Date) {
    const result = safeDateParse(date || new Date()).toLocaleString()
    return result.substring(0, result.length - 3);
}
