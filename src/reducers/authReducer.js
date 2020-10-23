import { LOGOUT } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: localStorage.getItem('bearbnb-token'),
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem('bearbnb-token');

      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        error: null
      };
    default:
      return state;
  }
};
