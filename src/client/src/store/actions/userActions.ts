import { User } from '../../models/User';
import { Family } from '../../models/Family';

export const setUser = (user: User) => ({
  type: 'SET_USER',
  payload: user
});

export const addFamily = (family: Family) => ({
  type: 'ADD_FAMILY',
  payload: family
});
