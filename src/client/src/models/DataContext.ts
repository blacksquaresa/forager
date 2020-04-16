import { User } from './User';
import { Family } from './Family';

export type DataContext = {
  currentUser?: User;
  currentFamily?: Family;
  users: User[];
  families: Family[];
};
