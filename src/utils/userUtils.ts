import {User} from "./types";
import axiosInstance from "./axiosConfig";


export const getUserFromStorage = () => {
    const userJSON = localStorage.getItem("user")
    if (userJSON)
        return JSON.parse(userJSON) as User
    return null;
}


const findUser = async (id: number) => {
    const flowersEndpoint = "/api/v1/user";
    const response = await axiosInstance.get(flowersEndpoint + "/" + id)
    return response.data
}
export {findUser}