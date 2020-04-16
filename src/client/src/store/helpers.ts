import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import { Family } from '../models/Family';
import { Mapped } from './types';
import { List } from 'immutable';
import store from './store';

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

export function toUser(source?: Mapped<User>): User | undefined {
  if (!source) {
    return undefined;
  }

  const user = source.toJS() as User;
  if (typeof user.families?.[0] === 'number') {
    const state = store.getState();
    const families = getFamilies(state);
    const actualFamilies: Family[] = [];
    for (let familyId of user.families) {
      const family = families.find((f) => f.get('id') === familyId);
      if (family) {
        actualFamilies.push(toFamily(family)!);
      }
    }
    user.families = actualFamilies;
  }
  return user;
}

export function toFamily(source?: Mapped<Family>): Family | undefined {
  if (!source) {
    return undefined;
  }

  const family = source.toJS() as Family;
  if (typeof family.members?.[0] === 'number') {
    const state = store.getState();
    const members = getUsers(state);
    const actualMembers: User[] = [];
    for (let memberId of family.members) {
      const member = members.find((m) => m.get('id') === memberId)?.toJS() as User;
      if (member) {
        actualMembers.push(member);
      }
    }
    family.members = actualMembers;
  }
  return family;
}
