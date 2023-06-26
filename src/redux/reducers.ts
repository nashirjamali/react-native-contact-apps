import {SET_FORM, RESET} from './constants';

type Action = {
  type: string;
  payload?: any;
};

const initialState = {
  firstName: null,
  lastName: null,
  age: null,
  photo: null,
  id: null,
};

export const formReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        ...action.payload,
      };
    case RESET:
      return {
        ...state,
        firstName: null,
        lastName: null,
        age: null,
        photo: null,
        id: null,
      };
    default:
      return state;
  }
};
