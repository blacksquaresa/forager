import { User } from './User';
import { Family } from './Family';
import { Invitation } from './Invitation';
import { List } from './List';
import { Product } from './Product';

export type DataContext = {
  currentUser?: User;
  currentFamily?: Family;
  users: User[];
  families: Family[];
  invitations: Invitation[];
  lists: List[];
  products: Product[];
};
