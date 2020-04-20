import { User } from './User';
import { Family } from './Family';
import { Invitation } from './Invitation';
import { List } from './List';

export interface InitialData {
  currentUser: number;
  users: User[];
  families: Family[];
  invitations: Invitation[];
  lists: List[];
}
