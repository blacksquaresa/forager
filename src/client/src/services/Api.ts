import { User } from "../models/User";

export class Api {
  constructor(private serverRoot: string) {}

  public async login() {
    const result = await this.sendRequest("login");
    return result;
  }

  public async getCurrentUser(): Promise<User> {
    const result = await this.sendRequest("user");
    return result as User;
  }

  private async sendRequest<T>(endpoint: string, params?: {}): Promise<T> {
    const rawRespoonse = await fetch(this.buildEndpoint(endpoint));
    const json = await rawRespoonse.json();
    return json as T;
  }

  private buildEndpoint(endpoint: string): string {
    return [this.serverRoot, endpoint].join("/");
  }
}
