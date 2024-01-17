import {User} from "./types";

export const getUserFromStorage = () => {
    const userJSON = localStorage.getItem("user")
    if (userJSON)
        return JSON.parse(userJSON) as User
    return null;
}