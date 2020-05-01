import { Action, Mapped } from './types';
import { DataContext } from '../models/DataContext';
import { InitialData } from '../models/InitialData';
import { fromJS, List } from 'immutable';
import { Invitation } from '../models/Invitation';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { Family } from '../models/Family';
import { Variant } from '../models/Variant';

const initialState: DataContext = {
  users: [],
  families: [],
  invitations: [],
  lists: [],
  products: []
};

const reducer = (state: Mapped<DataContext> = fromJS(initialState), action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return state.updateIn(['users'], (users) => users.push(fromJS(action.payload)));
    }
    case 'ADD_FAMILY': {
      return state.withMutations((st) => {
        return st
          .updateIn(['families'], (families) => families.push(fromJS(action.payload)))
          .updateIn(['currentUser', 'families'], (families) => families.push(action.payload.id));
      });
    }
    case 'ADD_LIST': {
      return state.withMutations((st) => {
        const familyIndex = st.get('families').findKey((f: Mapped<Family>) => f.get('id') === action.payload.familyId);
        return st
          .updateIn(['lists'], (lists) => lists.push(fromJS(action.payload.list)))
          .updateIn(['families', familyIndex, 'lists'], (lists) => lists.push(action.payload.list.id));
      });
    }
    case 'ADD_PRODUCT': {
      return state.updateIn(['products'], (products) => products.push(fromJS(action.payload)));
    }
    case 'UPDATE_PRODUCT': {
      const productIndex = state.get('products').findKey((p: Mapped<Product>) => p.get('id') === action.payload.id);
      if (productIndex === undefined) {
        return state.updateIn(['products'], (products) => products.push(fromJS(action.payload)));
      }
      return state.updateIn(['products', productIndex], (product: Mapped<Product>) =>
        product.merge(fromJS(action.payload))
      );
    }
    case 'UPDATE_PRODUCTS': {
      return state.updateIn(['products'], (products: List<Mapped<Product>>) => products.merge(fromJS(action.payload)));
    }
    case 'ADD_VARIANT': {
      const productIndex = state
        .get('products')
        .findKey((p: Mapped<Product>) => p.get('id') === action.payload.product.id);
      if (productIndex === undefined) {
        action.payload.product.variants.push(action.payload.variant);
        return state.updateIn(['products'], (products) => products.push(fromJS(action.payload.product)));
      }
      return state.updateIn(['products', productIndex, 'variants'], (variants: List<Mapped<Variant>>) =>
        variants.push(fromJS(action.payload.variant))
      );
    }
    case 'UPDATE_VARIANT': {
      const productIndex = state
        .get('products')
        .findKey((p: Mapped<Product>) => p.get('id') === action.payload.product.id);
      if (productIndex === undefined) {
        action.payload.product.variants.push(action.payload.variant);
        return state.updateIn(['products'], (products) => products.push(fromJS(action.payload.product)));
      }

      const variantIndex = state
        .getIn(['products', productIndex, 'variants'])
        .findKey((p: Mapped<Variant>) => p.get('id') === action.payload.variant.id);
      if (variantIndex === undefined) {
        return state.updateIn(['products', productIndex, 'variants'], (variants) =>
          variants.push(fromJS(action.payload.variant))
        );
      }

      return state.updateIn(['products', productIndex, 'variants'], (variants: List<Mapped<Variant>>) =>
        variants.set(variantIndex, fromJS(action.payload.variant))
      );
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
