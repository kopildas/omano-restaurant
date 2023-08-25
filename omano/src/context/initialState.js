import { fetchCartData, fetchLocalStorageData } from "../utils/fetchLocalStorageData"

const userInfo=fetchLocalStorageData();
const cartInfo=fetchCartData();

export const initialState = {
    user: userInfo,
    foodItem: null,
    cartShow:false,
    cartItems: cartInfo,
    
}