import { orgentityConstants } from './constants'
import axios from '../axios'

export const createOrgentity = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.SAVE_ORGENTITY_REQUEST })
    const res = await axios.post(`/admin/org_entities`, udata)

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.SAVE_ORGENTITY_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: orgentityConstants.SAVE_ORGENTITY_FAILURE,
        payload: { message: res.data.message, input: res.data.input },
      })
    }
  }
}

export const updateEmployee = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.UPDATE_EMPLOYEE_REQUEST })
    const res = await axios.post(`/admin/update_employee`, udata)

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.UPDATE_EMPLOYEE_SUCCESS,
        payload: { message: res.data.message },
      })
    } else {
      dispatch({
        type: orgentityConstants.UPDATE_EMPLOYEE_FAILURE,
        payload: { message: res.data.message },
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
    const res = await axios.get('/admin/org_entities?page='+data.page+'&perPage='+data.perPage+'&search='+data.search)
    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.GET_ORGENTITIES_SUCCESS,
        payload: res.data,
      })
    } else {
      dispatch({
        type: orgentityConstants.GET_ORGENTITIES_FAILURE,
        payload: { message: res.data.message },
      })
    }
  }
}

export const get_singleemployee = (udata) => {
  return async (dispatch) => {
    dispatch({ type: orgentityConstants.GET_SINGLEEMPLOYEE_REQUEST })
    const res = await axios.post(`/admin/get_singleemployee`, udata)

    if (res.status === 200) {
      dispatch({
        type: orgentityConstants.GET_SINGLEEMPLOYEE_SUCCESS,
        payload: res.data.employee_data,
      })
    } else {
      if (res.status === 202) {
        dispatch({
          type: orgentityConstants.GET_SINGLEEMPLOYEE_FAILURE,
          payload: { message: res.data.message },
        })
      }
    }
  }
}
