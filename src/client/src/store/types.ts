import { Map } from 'immutable';
import { User } from '../models/User';
import { Family } from '../models/Family';
import { Invitation } from '../models/Invitation';
import { InitialData } from '../models/InitialData';
import { Product } from '../models/Product';
import { List } from '../models/List';
import { Variant } from '../models/Variant';
import { ListItem } from '../models/ListItem';

type setUserAction = {
  type: 'SET_USER';
  payload: User;
};

type addUsersAction = {
  type: 'ADD_USERS';
  payload: User[];
};

type addFamilyAction = {
  type: 'ADD_FAMILY';
  payload: Family;
};

type addListAction = {
  type: 'ADD_LIST';
  payload: { list: List; familyId: number };
};

type updateListAction = {
  type: 'UPDATE_LIST';
  payload: List;
};

type addListItemAction = {
  type: 'ADD_LISTITEMS';
  payload: { listId: number; items: ListItem[] };
};

type addProductAction = {
  type: 'ADD_PRODUCT';
  payload: Product;
};

type updateProductAction = {
  type: 'UPDATE_PRODUCT';
  payload: Product;
};

type updateProductsAction = {
  type: 'UPDATE_PRODUCTS';
  payload: Product[];
};

type addVariantAction = {
  type: 'ADD_VARIANT';
  payload: { product: Product; variant: Variant };
};

type updateVariantAction = {
  type: 'UPDATE_VARIANT';
  payload: { product: Product; variant: Variant };
};

type addFamiliesAction = {
  type: 'ADD_FAMILIES';
  payload: Family[];
};

type acceptInvitationAction = {
  type: 'ACCEPT_INVITATION';
  payload: { invitation: Invitation; family: Family };
};

type rejectInvitationAction = {
  type: 'REJECT_INVITATION';
  payload: Invitation;
};

type addInitialDataAction = {
  type: 'ADD_INITIAL_DATA';
  payload: InitialData;
};

export type Action =
  | setUserAction
  | addUsersAction
  | addFamilyAction
  | addListAction
  | updateListAction
  | addListItemAction
  | addProductAction
  | updateProductAction
  | updateProductsAction
  | addVariantAction
  | updateVariantAction
  | addFamiliesAction
  | acceptInvitationAction
  | rejectInvitationAction
  | addInitialDataAction;

export interface Mapped<T> extends Map<keyof T, any> {}
