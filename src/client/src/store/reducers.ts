import { User } from '../models/User';
import { Action, Mapped } from './types';
import { Family } from '../models/Family';
import { DataContext } from '../models/DataContext';
import { InitialData } from '../models/InitialData';
import { fromJS, Map } from 'immutable';

const initialState: DataContext = {
  users: [],
  families: []
};

const reducer = (
  state: Mapped<DataContext> = fromJS(initialState),
  action: Action<User | Family | User[] | Family[] | InitialData>
) => {
  switch (action.type) {
    case 'ADD_USER': {
      return state.updateIn(['users'], (users) => users.push(fromJS(action.payload)));
    }
    case 'ADD_FAMILY': {
      return state.updateIn(['families'], (families) => families.push(fromJS(action.payload)));
    }
    case 'ADD_INITIAL_DATA': {
      let data = action.payload as InitialData;

      let currentUser = data.users.find((u) => u.id === data.currentUser);
      if (currentUser) {
        currentUser.isLoggedIn = true;
        const newState = state.withMutations((st) => {
          return st
            .set('currentUser', fromJS(currentUser))
            .updateIn(['users'], (users) => users.concat(fromJS(data.users)))
            .updateIn(['families'], (families) => families.concat(fromJS(data.families)));
        });
        return newState;
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
