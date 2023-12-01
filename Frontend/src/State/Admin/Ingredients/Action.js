// action.js
import axios from 'axios';
import { GET_INGREDIENTS, UPDATE_STOCK } from './ActionType';
import { API_URL, api } from '../../../config/api';

// Action creator to get all ingredients of a restaurant
export const getIngredientsOfRestaurant = (id) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${2}`);
      console.log("get all ingredients ",response.data)
      dispatch({
        type: GET_INGREDIENTS,
        payload: response.data // Assuming the response contains the ingredients data
      });
    } catch (error) {
        console.log("error",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};

// Action creator to update stock of a specific ingredient
export const updateStockOfIngredient = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await api.put(`/api/admin/ingredients/${id}/stoke`, 
      { });
      dispatch({
        type: UPDATE_STOCK,
        payload: data
      });
      console.log("update ingredients stock ",data)
    } catch (error) {
        console.log("error ",error)
      // Handle error, dispatch an error action, etc.
    }
  };
};
