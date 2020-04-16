import { User } from './User';
import { Family } from './Family';
import { Invitation } from './Invitation';

export interface InitialData {
  currentUser: number;
  users: User[];
  families: Family[];
  invitations: Invitation[];
}
