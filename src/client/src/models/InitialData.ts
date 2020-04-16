import { User } from './User';
import { Family } from './Family';

export interface InitialData {
  currentUser: number;
  users: User[];
  families: Family[];
}
