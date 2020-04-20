import { Action, Mapped } from './types';
import { DataContext } from '../models/DataContext';
import { InitialData } from '../models/InitialData';
import { fromJS } from 'immutable';
import { Invitation } from '../models/Invitation';

const initialState: DataContext = {
  users: [],
  families: [],
  invitations: [],
  lists: []
};

const reducer = (state: Mapped<DataContext> = fromJS(initialState), action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
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
            .updateIn(['families'], (families) => families.concat(fromJS(data.families)))
            .updateIn(['invitations'], (invitations) => invitations.concat(fromJS(data.invitations)))
            .updateIn(['lists'], (lists) => lists.concat(fromJS(data.lists)));
        });
        return newState;
      }
      return state;
    }
    case 'ACCEPT_INVITATION': {
      const newState = state.withMutations((st) => {
        return st
          .updateIn(['families'], (families) => families.push(fromJS(action.payload.family)))
          .updateIn(['invitations'], (invitations) =>
            invitations.filter((i: Mapped<Invitation>) => i.get('id') !== action.payload.invitation.id)
          );
      });
      return newState;
    }
    case 'REJECT_INVITATION': {
      const newState = state.updateIn(['invitations'], (invitations) =>
        invitations.filter((i: Mapped<Invitation>) => i.get('id') !== action.payload.id)
      );
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
