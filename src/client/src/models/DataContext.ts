import { User } from './User';
import { Family } from './Family';

export class DataContext {
  public user: User = new User();
  public family?: Family;
}
