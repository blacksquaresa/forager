import { User } from '../models/User';
import { Family } from '../models/Family';
import { InitialData } from '../models/InitialData';
import { Invitation } from '../models/Invitation';

export const setUser = (user: User) => ({
  type: 'SET_USER',
  payload: user
});

export const addUsers = (users: User[]) => ({
  type: 'ADD_USERS',
  payload: users
});

export const addFamily = (family: Family) => ({
  type: 'ADD_FAMILY',
  payload: family
});

export const addFamilies = (families: Family[]) => ({
  type: 'ADD_FAMILIES',
  payload: families
});

export const acceptInvitation = (invitation: Invitation, family: Family) => ({
  type: 'ACCEPT_INVITATION',
  payload: { family, invitation }
});

export const rejectInvitation = (invitation: Invitation) => ({
  type: 'REJECT_INVITATION',
  payload: invitation
});

export const addInitialData = (data: InitialData) => ({
  type: 'ADD_INITIAL_DATA',
  payload: data
});
