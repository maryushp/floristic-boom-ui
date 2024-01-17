import {OrderCreationRequest} from "./types";
import axiosInstance from "./axiosConfig";

export const createOrder = async (ocr: OrderCreationRequest) => {
    const orderEndpoint = "/api/v1/purchase"
    const response = await axiosInstance.post(orderEndpoint, ocr)
    return response.data
}