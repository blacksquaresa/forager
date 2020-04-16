import { Family } from './Family';
import { List } from 'immutable';

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  families: Family[];
  isLoggedIn: boolean;
};
