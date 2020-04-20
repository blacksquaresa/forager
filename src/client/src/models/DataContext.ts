import { User } from './User';
import { Family } from './Family';
import { Invitation } from './Invitation';
import { List } from './List';

export type DataContext = {
  currentUser?: User;
  currentFamily?: Family;
  users: User[];
  families: Family[];
  invitations: Invitation[];
  lists: List[];
};
