import axiosInstance from "./axiosConfig";

const readAllBouquets = async (currentPage: number, currentSize: number) => {
    const bouquetsEndpoint = "/api/v1/bouquet";
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;
    const response = await axiosInstance.get(bouquetsEndpoint + pageParams)
    return response.data
}
export {readAllBouquets}