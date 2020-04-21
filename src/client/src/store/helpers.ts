import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import { Family } from '../models/Family';
import { Mapped } from './types';
import { List } from 'immutable';
import { List as ShoppingList } from '../models/List';
import store from './store';
import { Invitation } from '../models/Invitation';

export function isLoggedIn(state: Mapped<DataContext>): boolean {
  const isLoggedIn = state.get('currentUser')?.get('isLoggedIn');
  return isLoggedIn;
}

export function getCurrentUser(state: Mapped<DataContext>): Mapped<User> {
  const user = state.get('currentUser') as Mapped<User>;
  return user;
}

export function getCurrentFamily(state: Mapped<DataContext>): Mapped<Family> {
  const family = state.get('currentFamily') as Mapped<Family>;
  return family;
}

export function getFamilies(state: Mapped<DataContext>): List<Mapped<Family>> {
  const families = state.get('families') as List<Mapped<Family>>;
  return families;
}

export function getUsers(state: Mapped<DataContext>): List<Mapped<User>> {
  const users = state.get('users') as List<Mapped<User>>;
  return users;
}

export function getLists(state: Mapped<DataContext>): List<Mapped<ShoppingList>> {
  const lists = state.get('lists') as List<Mapped<ShoppingList>>;
  return lists;
}

export function getInvitations(state: Mapped<DataContext>): List<Mapped<Invitation>> {
  const invitations = state.get('invitations') as List<Mapped<Invitation>>;
  return invitations;
}

export function toUser(source?: Mapped<User>): User | undefined {
  if (!source) {
    return undefined;
  }

  const user = source.toJS() as User;
  user.families = convertIdsToElements<User, Family>(user, 'families', 'families', toFamily);
  return user;
}

export function toFamily(source?: Mapped<Family>): Family | undefined {
  if (!source) {
    return undefined;
  }

  const family = source.toJS() as Family;
  family.members = convertIdsToElements(family, 'members', 'users');
  family.lists = convertIdsToElements(family, 'lists', 'lists');
  return family;
}

export function toInvitationArray(source?: List<Mapped<Invitation>>): Invitation[] | undefined {
  if (!source) {
    return undefined;
  }

  const list = source.toJS() as Invitation[];
  return list;
}

function defaultConverter<T>(source?: Mapped<T>): T | undefined {
  return source?.toJS() as T;
}
function convertIdsToElements<TParent extends { [key: string]: any }, TElement extends { id: number }>(
  parent: TParent,
  prop: keyof TParent,
  stateProp: keyof DataContext,
  converter: (source?: Mapped<TElement>) => TElement | undefined = defaultConverter
): TElement[] {
  if (
    parent?.[prop]?.length &&
    typeof Array.isArray(parent[prop]) &&
    typeof (parent[prop] as Array<any>)[0] === 'number'
  ) {
    const state = store.getState();
    const elements = state.get(stateProp) as List<Mapped<TElement>>;
    const actual: TElement[] = [];
    for (let id of parent[prop]) {
      const element = converter(elements.find((l) => l.get('id') === id)) as TElement;
      if (element) {
        actual.push(element);
      }
    }
    return actual;
  }

  return parent[prop];
}

export default {
  isLoggedIn,
  getCurrentUser,
  getCurrentFamily,
  getFamilies,
  getUsers,
  getInvitations,
  toUser,
  toFamily,
  toInvitationArray
};
