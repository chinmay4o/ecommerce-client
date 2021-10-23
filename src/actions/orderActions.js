import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from "../constants/orderConstants.js";


export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userInfo.token}`,
      },
      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    //   dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};


export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch(`/api/orders/${id}`, {
      method: "GET",
      headers: {
        Authorization: `bearer ${userInfo.token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    //   dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
