import { orgentityConstants } from './constants'
import axios from '../axios'
import axiosIntance from '../axios'

export const createOrgentity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.SAVE_ORGENTITY_REQUEST })
    udata["action"] = "CREATE";
    const res = await axiosIntance(`/api/admin/org_entities`, udata, 'post')

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.SAVE_ORGENTITY_SUCCESS,
        payload: { data: res.message },
      })
    } else {
      dispatch({
        type: orgentityConstants.SAVE_ORGENTITY_FAILURE,
        payload: { message: res.message, input: res.input },
      })
    }
  }
}

export const updateOrgentity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.UPDATE_ORGENTITY_REQUEST })
    udata["action"] = "UPDATE";
    const res = await axiosIntance(`/api/admin/org_entities`, udata, 'post')

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.UPDATE_ORGENTITY_SUCCESS,
        payload: { message: res.message },
      })
    } else {
      dispatch({
        type: orgentityConstants.UPDATE_ORGENTITY_FAILURE,
        payload: { message: res.message, input: res.input },
      })
    }
  }
}

export const deleteEmployee = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.DELETE_EMPLOYEE_REQUEST })
    const res = await axios.delete(`/admin/delete_employee`, { data: udata })

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.DELETE_EMPLOYEE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: orgentityConstants.DELETE_EMPLOYEE_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const getOrgentities = (data) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.GET_ORGENTITIES_REQUEST })
    data["action"] = "GET";
    const res = await axiosIntance('/api/admin/org_entities', data, 'post');
    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.GET_ORGENTITIES_SUCCESS,
        payload: res,
      })
    } else {
      dispatch({
        type: orgentityConstants.GET_ORGENTITIES_FAILURE,
        payload: { message: res.message },
      })
    }
  }
}

export const get_singleentity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.GET_SINGLEORGENTITY_REQUEST })
    udata['action'] = 'SINGLE';
    const res = await axiosIntance(`/api/admin/org_entities`, udata, 'post')

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.GET_SINGLEORGENTITY_SUCCESS,
        payload: res.entity_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: orgentityConstants.GET_SINGLEORGENTITY_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}
