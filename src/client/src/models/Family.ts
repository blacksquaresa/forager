import { User } from './User';
import { List } from 'immutable';

export type Family = {
  id: number;
  name: string;
  creator: User;
  members: User[];
};
