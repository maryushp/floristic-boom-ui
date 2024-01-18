import {Color, Filter, Occasion, Size} from "./types";

export const isFilterEmpty = (filter: Filter): boolean => {
    for (const key in filter) {
        if (filter[key as keyof Filter] !== null) {
            return false;
        }
    }
    return true;
};

export function checkOccasion(filters: Filter) {
    if (filters.occasion) {
        switch (filters.occasion) {
            case Occasion.ANNIVERSARY:
                filters.size = Size.SMALL
                filters.priceMax = 200
                filters.priceMin = 100
                break
            case Occasion.BIRTHDAY:
                filters.size = Size.SMALL
                filters.priceMax = 130
                filters.priceMin = 20
                break
            case Occasion.GRADUATION:
                filters.size = Size.SMALL
                filters.priceMax = 400
                filters.priceMin = 200
                break
        }
    }
}

export function checkFlowerOccasion(filters: Filter) {
    if (filters.occasion) {
        switch (filters.occasion) {
            case Occasion.ANNIVERSARY:
                filters.color = Color.PINK
                filters.priceMax = 20
                filters.priceMin = 5
                break
            case Occasion.BIRTHDAY:
                filters.color = Color.WHITE
                filters.priceMax = 25
                filters.priceMin = 10
                break
            case Occasion.GRADUATION:
                filters.color = Color.BLUE
                filters.priceMax = 20
                filters.priceMin = 3
                break
        }
    }
}

export function checkMinPrice(minPrice: number | null) {
    if (minPrice) {
        return `&minPrice=${minPrice}`
    }
    return ""
}

export function checkMaxPrice(maxPrice: number | null) {
    if (maxPrice) {
        return `&maxPrice=${maxPrice}`
    }
    return ""
}

export function checkSize(size: Size | null) {
    if (size) {
        switch (size) {
            case Size.BIG:
                return "&minSize=50"
            case Size.MEDIUM:
                return "&minSize=20&maxSize=50"
            case Size.SMALL:
                return "&maxSize=20"
        }
    }
    return "";
}

export function checkColor(color: Color | null) {
    if (color) {
        return `&color=${color.toUpperCase()}`
    }
    return "";
}