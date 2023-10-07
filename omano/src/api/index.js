import axios from "axios";

export const baseURL = "http://localhost:5001/omano-df188/us-central1/app";

export const validateUserJWTTOken = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/jwtVerifi`, {
            headers: { authorization: "Bearer " + token},
        });
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}


export const addNewProduct = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/create`, {...data})
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}



export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/all`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}


// delete products
export const deleteProduct = async (productId) => {
    try {
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}


// edit products
export const editProduct = async (data,productId) => {
    try {
        const res = await axios.put(`${baseURL}/api/products/edit/${productId}`, {...data})
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}



export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users/all`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

export const getSpeciUser = async (user_id) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/speciuser/${user_id}`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}
// delete user
export const deleteUserUid = async (userId) => {
    try {
        const res = await axios.delete(`${baseURL}/api/users/delete/${userId}`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

// edit user
export const editUserUid = async (data,uidtId) => {
    try {
        const res = await axios.put(`${baseURL}/api/products/edit/${uidtId}`, {...data})
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}



export const addNewReview = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/reviews/create`, {...data})
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}


export const getSpeciReview = async (productId) => {
    try {
        const res = await axios.get(`${baseURL}/api/reviews/get/${productId}`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}

export const getAllReview = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/reviews/get-all`)
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}


// edit Review
export const editReview = async (data,productId) => {
    try {
        const res = await axios.put(`${baseURL}/api/reviews/edit/${productId}`, {...data})
        // console.log(res);
        return res.data.data;
    } catch (error) {
        // console.log(error);
        return null;
    }
}