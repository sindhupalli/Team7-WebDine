import { api } from "../../../config/api";
import {
  createMenuItemFailure,
  createMenuItemRequest,
  createMenuItemSuccess,
  deleteMenuItemFailure,
  deleteMenuItemRequest,
  deleteMenuItemSuccess,
  getMenuItemsByRestaurantIdFailure,
  getMenuItemsByRestaurantIdRequest,
  getMenuItemsByRestaurantIdSuccess,
} from "./ActionCreators";
import {
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

// localhost:5454/api/admin/ingredients/food/16

export const createMenuItem = (menuItemData) => {
  return async (dispatch) => {
    dispatch(createMenuItemRequest());
    try {
      const { data } = await api.post("api/admin/menu", menuItemData);
      console.log("created menu ", data);
      dispatch(createMenuItemSuccess(data));
    } catch (error) {
      console.log("catch error ", error);
      dispatch(createMenuItemFailure(error));
    }
  };
};

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByRestaurantIdRequest());
    try {
      const { data } = await api.get(
        `/api/menu/restaurant/${reqData.restaurantId}?vegetarian=${reqData.vegetarian}&nonveg=${reqData.nonveg}
        &seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu item by restaurants ", data);
      dispatch(getMenuItemsByRestaurantIdSuccess(data));
    } catch (error) {
      dispatch(getMenuItemsByRestaurantIdFailure(error));
    }
  };
};

export const deleteMenuItem = (menuItemId) => {
  return async (dispatch) => {
    dispatch(deleteMenuItemRequest());
    try {
      await api.delete(`api/admin/menu/${menuItemId}`);
      dispatch(deleteMenuItemSuccess(menuItemId));
    } catch (error) {
      dispatch(deleteMenuItemFailure(error));
    }
  };
};

export const searchMenuItem = (keyword) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`api/menu/search?name=${keyword}`);
      console.log("data ----------- ", data);
      dispatch({ type: SEARCH_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SEARCH_MENU_ITEM_FAILURE });
    }
  };
};

export const getAllIngredientsOfMenuItem = (reqData) => {
  return async (dispatch) => {
    dispatch(getMenuItemsByRestaurantIdRequest());
    try {
      const { data } = await api.get(
        `api/menu/restaurant/${reqData.restaurantId}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.jwt}`,
          },
        }
      );
      console.log("menu item by restaurants ", data);
      dispatch(getMenuItemsByRestaurantIdSuccess(data));
    } catch (error) {
      dispatch(getMenuItemsByRestaurantIdFailure(error));
    }
  };
};

export const updateMenuItemsAvailability = (menuItemId) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(`/api/admin/menu/${menuItemId}`, {});
      console.log("update menuItems Availability ", data);
      dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
};
};

export const deleteFoodAction = (foodId) => async (dispatch) => {
  dispatch({ type: DELETE_MENU_ITEM_REQUEST });
  try {
    const { data } = await api.delete(`/api/admin/menu/${foodId}`, {});
    console.log("delete food ", data);
    dispatch({ type: DELETE_MENU_ITEM_SUCCESS, payload: foodId });
  } catch (error) {
    dispatch({ type: DELETE_MENU_ITEM_FAILURE, payload: error });
  }
};
