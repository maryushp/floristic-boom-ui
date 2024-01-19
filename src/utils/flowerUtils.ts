import axiosInstance from "./axiosConfig";
import {Filter} from "./types";
import {checkColor, checkFlowerOccasion, checkMaxPrice, checkMinPrice, isFilterEmpty} from "./filterUtils";

const flowersEndpoint = "/api/v1/flower";

const readAllFlowers = async (currentPage: number, currentSize: number, filters: Filter) => {
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;

    let uri = flowersEndpoint
    if (!isFilterEmpty(filters)) {
        let priceMinUri = ""
        let priceMaxUri = ""
        let colorUri = ""
        checkFlowerOccasion(filters);
        priceMinUri = checkMinPrice(filters.priceMin);
        priceMaxUri = checkMaxPrice(filters.priceMax);
        if (filters.color)
            colorUri = checkColor(filters.color);
        uri += "/search" + pageParams + priceMinUri + priceMaxUri + colorUri
    } else {
        uri += pageParams
    }
    const response = await axiosInstance.get(uri)
    return response.data
}
export {readAllFlowers}