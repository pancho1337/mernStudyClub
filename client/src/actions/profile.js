import axios from 'axios'
import { setAlert } from './alert'

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED
} from './types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me')
        // console.log(res.data)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const getProfiles = () => async dispatch => {
    try {
        
    } catch (error) {
        
    }
}

export const createProfile = ( formData, history, edit = false ) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const  res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'profile updated' : 'profile created', 'success'))
        // if(!edit){
            history.push('/dashboard')
        // }
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger') ))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const  res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert( 'Experience Added' , 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger') ))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const  res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert( 'Education Added' , 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors = error.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger') ))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Experience Deleted", "success"))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert("Education Deleted", "success"))
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: error.response.statusText, 
                status: error.response.status
            }
        })
    }
}

export const deleteAccount = () => async dispatch => {
    if(window.confirm("Are you sure about this? There is no turning back!!")){
        try {
            const res = await axios.delete('/api/profile')
            dispatch({ type: CLEAR_PROFILE })
            dispatch({ type: ACCOUNT_DELETED })
            dispatch(setAlert('see you space cowboy...'))
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response.statusText, 
                    status: error.response.status
                }
            })
        }
    }
}