import { User } from './User';
import { List } from './List';

export type Family = {
  id: number;
  name: string;
  creator: User;
  members: User[];
  lists: List[];
};
