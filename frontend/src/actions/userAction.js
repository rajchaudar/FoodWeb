import axios from "axios";
import Headers from "../components/layouts/Header";
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../constants/userConstant"
import { CLEAR_ERRORS } from "../constants/restaurantConstant";

//Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `/api/v1/users/login`,
            { email, password },
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data.user,
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed",
        });
    }
};

//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = {
            headers: { "Content-Type": "multipart/form-data" },
        };
        const { data } = await axios.post(`/api/v1/users/signup`, userData, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        });
        return data.data.user;//
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Load user Action

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`/api/v1/users/me`);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });

    }
};

//Logout action
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/users/logout`);

        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }

};

//clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
