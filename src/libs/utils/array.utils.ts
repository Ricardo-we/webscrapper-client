import { parseToDateOrNumber } from "./string.utils";
import { safeJsonParse } from "./general";

export function createFilter(filterBy: any, filter: any) {
    return (currentItem: any, index: number) => {
        const isSimilarText = (typeof currentItem[filterBy] === "string" &&
            currentItem?.[filterBy]?.toLowerCase()?.includes(filter.toLowerCase()));
        const isMoreThan = (typeof currentItem?.[filterBy] === "number" && currentItem?.[filterBy] >= currentItem?.[filterBy]);

        return isSimilarText || isMoreThan;
    }
}

interface multipleAttributesFilterArgs {
    filterByAttributes: string[];
    filter: any;
    compareByBiggerNumber?: boolean;
}

export function createMultipleAttributesFilter({ filterByAttributes, filter, compareByBiggerNumber = true }: multipleAttributesFilterArgs) {
    return (item: any, index: number): boolean => {
        for (const attrName of filterByAttributes) {
            const isString = typeof item[attrName] === "string";
            const isNumber = typeof item[attrName] === "number";
            const isSimilarText = (isString && item?.[attrName]?.toLowerCase()?.includes(filter[attrName].toLowerCase()));
            const isMoreOrLessThan = (isNumber && compareByBiggerNumber
                ? item?.[attrName] >= filter?.[attrName]
                : item?.[attrName] <= filter?.[attrName]
            );
            const equalObjects = (!isNumber && !isString && safeJsonParse(item) === safeJsonParse(filter));

            return isSimilarText || isMoreOrLessThan || equalObjects;
        }
        return false;
    }
}

export function createItemsSorter(sortBy: string, order: "asc" | "desc") {
    return (firstItem: any, secondItem: any) => {
        const orderingValue = order === "desc" ? -1 : 1;
        let a = firstItem[sortBy];
        let b = secondItem[sortBy]

        if (typeof a === "string" && typeof b === "string") return ('' + a).localeCompare(b) * orderingValue;
        if (typeof a === "string") a = parseToDateOrNumber(a);
        if (typeof b === "string") b = parseToDateOrNumber(b);

        return ((a - b) * orderingValue);
    }
}

/***
 * Compare two arrays,
 * Made it to compare duplicate items
*/
export function doubleArrayDiscardFilter(
    newArray: any[],
    currentArray: any[],
    cb: (arr1Item?: any, arr2Item?: any) => boolean
) {
    return newArray?.filter(
        (arr1Item: any) =>
            currentArray.filter((arr2Item) => cb(arr1Item, arr2Item))
                .length < 0,
    )
}