import { User } from '../../models/User';
import { Action } from '../types';

const userReducer = (state = new User(), action: Action<User>) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload;
    }
    case 'ADD_FAMILY': {
      state.families.push(action.payload);
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
