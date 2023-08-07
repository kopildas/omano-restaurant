import { fetchLocalStorageData } from "../utils/fetchLocalStorageData"

const userInfo=fetchLocalStorageData()

export const initialState = {
    user: userInfo,
}