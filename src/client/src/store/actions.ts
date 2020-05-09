import { User } from '../models/User';
import { Family } from '../models/Family';
import { InitialData } from '../models/InitialData';
import { Invitation } from '../models/Invitation';
import { Product } from '../models/Product';
import { List } from '../models/List';
import { Variant } from '../models/Variant';
import { ListItem } from '../models/ListItem';

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

export const addList = (list: List, familyId: number) => ({
  type: 'ADD_LIST',
  payload: { list, familyId }
});

export const updateList = (list: List) => ({
  type: 'UPDATE_LIST',
  payload: list
});

export const addItemsToList = (listId: number, items: ListItem[]) => ({
  type: 'ADD_LISTITEMS',
  payload: { listId, items }
});

export const addProduct = (product: Product) => ({
  type: 'ADD_PRODUCT',
  payload: product
});

export const updateProduct = (product: Product) => ({
  type: 'UPDATE_PRODUCT',
  payload: product
});

export const updateProducts = (products: Product[]) => ({
  type: 'UPDATE_PRODUCTS',
  payload: products
});

export const addVariant = (product: Product, variant: Variant) => ({
  type: 'ADD_VARIANT',
  payload: { product, variant }
});

export const updateVariant = (product: Product, variant: Variant) => ({
  type: 'UPDATE_VARIANT',
  payload: { product, variant }
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
