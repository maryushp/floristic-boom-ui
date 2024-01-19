import axiosInstance from "./axiosConfig";

const findBonusByCode = async (bonusCode: string) => {
    const bonusCodeEndpoint = "/api/v1/bonus/code";
    const response = await axiosInstance.get(bonusCodeEndpoint + "?promo_code=" + bonusCode)
    return response.data
}

export {findBonusByCode}