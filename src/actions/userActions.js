import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,

  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,

  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userConstants";


// LOGIN ACTION
export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.message) {
      throw new Error("invalid email or password");
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: {
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: data.token,
      },
    });

    // localStorage.setItem(
    //   "userInfo",
    //   JSON.stringify(getState().userLogin.userInfo)
    // );
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.message,
    });
  }
};


// LOGOUT ACTION
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: USER_LOGOUT });
};


// REGISTER ACTIONS
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};


// GET USER DETAILS;
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const response = await fetch(`/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userInfo.token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};


//USER UPDATE ACTIONS
export const updateUserProfile =
  (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${userInfo.token}`,
        },
        body : JSON.stringify(user)
      });

      const data = await response.json();

      if (data.message) {
        throw new Error(data.message);
      }

      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });    
      // i am doing this change for a bug in ...            
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data }); 
      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error });
    }
  };
