import { Family } from './Family';

export class User {
  id: number = 0;
  name: string = '';
  email: string = '';
  avatar: string = '';
  families: Family[] = [];
  isLoggedIn: boolean = false;
}
