import axiosInstance from "./axiosConfig";
import {BouquetCreationRequest, Filter} from "./types";
import {getUserFromStorage} from "./userUtils";
import {checkMaxPrice, checkMinPrice, checkOccasion, checkSize, isFilterEmpty} from "./filterUtils";

const bouquetsEndpoint = "/api/v1/bouquet";

const readAllBouquets = async (currentPage: number, currentSize: number, filters: Filter) => {
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;

    let uri = bouquetsEndpoint
    if (!isFilterEmpty(filters)) {
        let priceMinUri = ""
        let priceMaxUri = ""
        let sizeUri = ""
        checkOccasion(filters);
        priceMinUri = checkMinPrice(filters.priceMin);
        priceMaxUri = checkMaxPrice(filters.priceMax);
        if (filters.size)
            sizeUri = checkSize(filters.size);
        uri += "/search" + pageParams + priceMinUri + priceMaxUri + sizeUri
    } else {
        uri += pageParams
    }
    const response = await axiosInstance.get(uri)
    return response.data
}

const readUserBouquets = async (currentPage: number, currentSize: number) => {
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;
    const user = getUserFromStorage()

    const response = await axiosInstance.get(bouquetsEndpoint + "/by-user/" + user?.id + pageParams)
    return response.data
}

const createBouquet = async (bcr: BouquetCreationRequest) => {
    const response = await axiosInstance.post(bouquetsEndpoint, bcr)
    return response.data
}
export {readAllBouquets, createBouquet, readUserBouquets}