/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { orgentityConstants } from '../actions/constants'

const initState = {
  loading: false,
  errorInput: "",
  org_entities: [],
  get_org_entities: true,
  get_singleorg_entity: true,
  is_org_entity_added: false,
  pageIndex: 0,
  total_pages: 0,
  total_count: 0,
  prevPage: false,
  nextPage: false,
  message: ""
}

export default (state = initState, action) => {
  switch (action.type) {
    case orgentityConstants.SAVE_ORGENTITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_org_entities: false,
        is_org_entity_added: false,
      }
      break
    case orgentityConstants.SAVE_ORGENTITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_org_entities: true,
        is_org_entity_added: true,
        message: action.payload.message,
      }
      break
    case orgentityConstants.SAVE_ORGENTITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_org_entities: false,
        is_org_entity_added: false,
        message: action.payload.message,
        errorInput: action.payload.input
      }
      break
    case orgentityConstants.UPDATE_ORGENTITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_org_entities: false,
        is_org_entity_added: false,
      }
      break
    case orgentityConstants.UPDATE_ORGENTITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_org_entities: true,
        is_org_entity_added: true,
        message: action.payload.message,
      }
      break
    case orgentityConstants.UPDATE_ORGENTITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_org_entities: false,
        is_org_entity_added: false,
        message: action.payload.message,
        errorInput: action.payload.input
      }
      break
    case orgentityConstants.DELETE_ORGENTITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_org_entities: false,
        is_org_entity_added: false,
      }
      break
    case orgentityConstants.DELETE_ORGENTITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_org_entities: true,
        is_org_entity_added: true,
        message: action.payload.message,
        
      }
      break
    case orgentityConstants.DELETE_ORGENTITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_org_entities: false,
        is_org_entity_added: false,
        message: action.payload.message,
      }
      break
    case orgentityConstants.GET_ORGENTITIES_REQUEST:
      state = {
        ...state,
        loading: true,
        get_org_entities: true,
        is_org_entity_added: false,
      }
      break
    case orgentityConstants.GET_ORGENTITIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_org_entities: false,
        is_org_entity_added: false,
        org_entities: action.payload.total_data,
        pageIndex: action.payload.pageIndex,
        total_pages: action.payload.total_pages,
        total_count: action.payload.total_count,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
      }
      break
    case orgentityConstants.GET_ORGENTITIES_FAILURE:
      state = {
        ...state,
        loading: false,
        get_org_entities: false,
        message: action.payload.message,
      }
      break
    case orgentityConstants.GET_SINGLEORGENTITY_REQUEST:
      state = {
        ...state,
        loading: true,
        get_singleorg_entity: true,
      }
      break
    case orgentityConstants.GET_SINGLEORGENTITY_SUCCESS:
      state = {
        ...state,
        loading: false,
        get_singleorg_entity: false,
        entity_data: action.payload,
      }
      break
    case orgentityConstants.GET_SINGLEORGENTITY_FAILURE:
      state = {
        ...state,
        loading: false,
        get_singleorg_entity: false,
        message: action.payload.message,
      }
      break
  }

  return state
}
