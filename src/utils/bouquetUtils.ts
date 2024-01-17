import axiosInstance from "./axiosConfig";
import {Bouquet} from "./types";
import {BouquetCreationRequest} from "./types";
import {getUserFromStorage} from "./userUtils";

const bouquetsEndpoint = "/api/v1/bouquet";

const readAllBouquets = async (currentPage: number, currentSize: number) => {
    const pageParams = `?page=${currentPage - 1}&size=${currentSize}`;
    const response = await axiosInstance.get(bouquetsEndpoint + pageParams)
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

const findBouquet = async (id: number) => {
    const response =  await axiosInstance.get<Bouquet>(bouquetsEndpoint + "/" + id)
    return response.data
}

export {readAllBouquets, findBouquet, createBouquet, readUserBouquets}