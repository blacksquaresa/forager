import { User } from './User';
import { Family } from './Family';
import { Invitation } from './Invitation';

export type DataContext = {
  currentUser?: User;
  currentFamily?: Family;
  users: User[];
  families: Family[];
  invitations: Invitation[];
};
