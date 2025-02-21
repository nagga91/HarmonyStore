import axios from 'axios'
import { REGISTER, LOGIN, GET_CURRENT } from '../actionType/ActionType'
import { alertError } from './AlertAction'

export const register = (data) => async (dispatch) => {
    try {
        const res = await axios.post('https://www.harmonystore01.com/api/Create_user', data)
        dispatch({ type: REGISTER, payload: res.data })

    } catch (error) {
        if (error.response.data) {
            (error.response.data.errors.forEach(element => {
                dispatch(alertError(element.msg))
            }))
        }

    }
}
export const login = (data, navigate) => async (dispatch) => {
    try {
        const res = await axios.post('https://www.harmonystore01.com/api/login', data)
        dispatch({ type: LOGIN, payload: res.data })
        navigate("/profile")
    } catch (error) {
        if (error.response.data) {
            (error.response.data.errors.forEach(element => {
                dispatch(alertError(element.msg))
            }))
        }


    }
}
export const get_current = () => async (dispatch) => {
    const config = { headers: { token: localStorage.getItem("token") } }
    try {
        const res = await axios.get('https://www.harmonystore01.com/api/getone_user/', config)
        dispatch({ type: GET_CURRENT, payload: res.data })
    } catch (error) {
        console.log(error)
    }
}