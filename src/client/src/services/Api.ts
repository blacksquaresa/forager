import { User } from '../models/User';
import { Family } from '../models/Family';

type RequestType = 'GET' | 'PUT' | 'POST' | 'DELETE';

export class Api {
  constructor(private serverRoot: string) {}

  public async login() {
    const result = await this.sendRequest('login');
    return result;
  }

  public async getCurrentUser(): Promise<User> {
    const result = await this.sendRequest('user');
    return result as User;
  }

  public async createFamily(name: string): Promise<Family> {
    const result = await this.sendRequest('family', 'PUT', name);
    return result as Family;
  }

  private async sendRequest<T>(
    endpoint: string,
    method: RequestType = 'GET',
    params?: { [key: string]: string } | string
  ): Promise<T> {
    const body = params ? JSON.stringify(params) : undefined;
    const headers = params ? { 'Content-Type': 'application/json' } : undefined;
    const rawRespoonse = await fetch(this.buildEndpoint(endpoint), { method, body, headers });
    const json = await rawRespoonse.json();
    return json as T;
  }

  private buildEndpoint(endpoint: string): string {
    return [this.serverRoot, endpoint].join('/');
  }
}
