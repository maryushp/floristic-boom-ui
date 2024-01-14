import axiosInstance from "./axiosConfig";

const readAllFlowers = async (currentPage: number, currentSize: number) => {
    const flowersEndpoint = "/api/v1/flower";
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;
    const response = await axiosInstance.get(flowersEndpoint + pageParams)
    return response.data
}
export {readAllFlowers}