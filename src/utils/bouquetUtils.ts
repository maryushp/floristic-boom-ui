import axiosInstance from "./axiosConfig";
import {Bouquet} from "./types";

const readAllBouquets = async (currentPage: number, currentSize: number) => {
    const bouquetsEndpoint = "/api/v1/bouquet";
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;
    const response = await axiosInstance.get(bouquetsEndpoint + pageParams)
    return response.data
}

const findBouquet = async (id: number) => {
    const bouquetsEndpoint = "/api/v1/bouquet";
    const response =  await axiosInstance.get<Bouquet>(bouquetsEndpoint + "/" + id)
    return response.data
}

export {readAllBouquets, findBouquet}