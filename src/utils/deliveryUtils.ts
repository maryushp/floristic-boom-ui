import axiosInstance from "./axiosConfig";

const readAllDeliveryTypes = async () => {
    const deliveryTypes = "/api/v1/delivery-type";
    const response = await axiosInstance.get(deliveryTypes)
    return response.data.content
}


export {readAllDeliveryTypes}