import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/addUserContant"
import axios from "axios"
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS } from "../constants/allUserConstant";


let link = `${window.location.origin}/api/v1`


export const addNewUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_USER_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post(`${link}/newemployee`, userData, config);

        dispatch({
            type: ADD_USER_SUCCESS,
            payload: data
        });

        return data.product;
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response.data.message
        });

        throw error;
    }
};


export const getAllUsers = (keyword="") => async (dispatch) => {

    try {
        dispatch({ type: ALL_USERS_REQUEST })

        // const { data } = await axios.get(`${link}/allemployees`)
        const { data } = await axios.get(`${link}/allemployees?keyword=${keyword}`);

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}