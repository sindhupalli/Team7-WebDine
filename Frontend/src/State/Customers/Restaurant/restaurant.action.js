// Actions.js

import axios from "axios";
import { API_URL, api } from "../../../config/api";

import {
  createRestaurantFailure,
  createRestaurantRequest,
  createRestaurantSuccess,
  deleteRestaurantFailure,
  deleteRestaurantRequest,
  deleteRestaurantSuccess,
  getAllRestaurantsFailure,
  getAllRestaurantsRequest,
  getAllRestaurantsSuccess,
  getRestaurantByIdFailure,
  getRestaurantByIdRequest,
  getRestaurantByIdSuccess,
  updateRestaurantFailure,
  updateRestaurantRequest,
  updateRestaurantSuccess,
} from "./ActionCreateros";

import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_RESTAIRANTS_EVENTS_FAILURE,
  GET_RESTAIRANTS_EVENTS_REQUEST,
  GET_RESTAIRANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_CATEGORY_FAILURE,
  GET_RESTAURANTS_CATEGORY_REQUEST,
  GET_RESTAURANTS_CATEGORY_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_FAILURE,
  GET_RESTAURANT_BY_USER_ID_REQUEST,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  UPDATE_RESTAURANT_STATUS_FAILURE,
  UPDATE_RESTAURANT_STATUS_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
} from "./ActionTypes";

export const getAllRestaurantsAction = (token) => {
  return async (dispatch) => {
    dispatch(getAllRestaurantsRequest());
    try {
      const { data } = await api.get("/api/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllRestaurantsSuccess(data));
      console.log("all restaurant ", data);
    } catch (error) {
      dispatch(getAllRestaurantsFailure(error));
    }
  };
};

export const getRestaurantById = (reqData) => {
  return async (dispatch) => {
    dispatch(getRestaurantByIdRequest());
    try {
      const response = await api.get(`api/restaurant/${reqData.restaurantId}`, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      dispatch(getRestaurantByIdSuccess(response.data));
    } catch (error) {
      dispatch(getRestaurantByIdFailure(error));
    }
  };
};

export const getRestaurantByUserId = (reqData) => {
  console.log("get restaurants by id");
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_BY_USER_ID_REQUEST });
    try {
      const { data } = await api.get(`/api/admin/restaurants/user`);
      console.log("data ", data);
      dispatch({ type: GET_RESTAURANT_BY_USER_ID_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error ", error);
      dispatch({
        type: GET_RESTAURANT_BY_USER_ID_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createRestaurant = (reqData) => {
  console.log("token", reqData.token);
  return async (dispatch) => {
    dispatch(createRestaurantRequest());
    try {
      const { data } = await api.post(
        `/api/admin/restaurant`,
        reqData.data);
      dispatch(createRestaurantSuccess(data));
      console.log("created restaurant ", data);
      alert("Restaurant created Successfully!");
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createRestaurantFailure(error));
    }
  };
};

export const updateRestaurant = (restaurantId, restaurantData) => {
  return async (dispatch) => {
    dispatch(updateRestaurantRequest());

    try {
      const res = await api.put(
        `api/admin/restaurant/${restaurantId}`,
        restaurantData
      );
      dispatch(updateRestaurantSuccess(res.data));
    } catch (error) {
      dispatch(updateRestaurantFailure(error));
    }
  };
};
export const deleteRestaurant = (restaurantId) => {
  return async (dispatch) => {
    dispatch(deleteRestaurantRequest());

    try {
      const res = await api.delete(`/api/admin/restaurant/${restaurantId}`);
      console.log("delete restaurant ", res.data);
      dispatch(deleteRestaurantSuccess(restaurantId));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(deleteRestaurantFailure(error));
    }
  };
};

export const updateRestaurantStatus = (restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });

    try {
      const res = await api.put(
        `api/admin/restaurant/${restaurantId}/status`,
        {}
      );
      console.log("ressssss ", res.data);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const res = await api.post(
        `api/admin/events/restaurant/${reqData.restaurantId}`,
        reqData.data
      );
      console.log("create events ", res.data);
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      console.log("catch - ",error)
      dispatch({ type: CREATE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const res = await api.get(`api/events`);
      console.log("get all events ", res.data);
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ALL_EVENTS_FAILURE, payload: error });
    }
  };
};

export const deleteEventAction = (eventId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const res = await api.delete(
        `api/admin/events/${eventId}`
      );
      console.log("DELETE events ", res.data);
      dispatch({ type: DELETE_EVENTS_SUCCESS, payload: eventId });
    } catch (error) {
      console.log("catch - ",error)
      dispatch({ type: DELETE_EVENTS_FAILURE, payload: error });
    }
  };
};

export const getRestaurnatsEvents = (restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAIRANTS_EVENTS_REQUEST });

    try {
      const res = await api.get(`/api/admin/events/restaurant/${restaurantId}`);
      console.log("get restaurants event ", res.data);
      dispatch({ type: GET_RESTAIRANTS_EVENTS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_RESTAIRANTS_EVENTS_FAILURE, payload: error });
    }
  };
};

export const createCategoryAction = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CATEGORY_REQUEST });

    try {
      const res = await api.post(
        `api/admin/category`,
        reqData
      );
      console.log("create category ", res.data);
      dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: res.data });
      alert("Category name created Successfully!")
    } catch (error) {
      console.log("catch - ",error)
      dispatch({ type: CREATE_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getRestaurantsCategory = (restaurantId) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_CATEGORY_REQUEST });
    try {
      const res = await api.get(`/api/category/restaurant/${restaurantId}`);
      console.log("get restaurants category ", res.data);
      dispatch({ type: GET_RESTAURANTS_CATEGORY_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_CATEGORY_FAILURE, payload: error });
    }
  };
};

// {{BASE_URL}}api/restaurant/2/status
