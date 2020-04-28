import { Family } from '../models/Family';
import { InitialData } from '../models/InitialData';
import { Product } from '../models/Product';
import { List } from '../models/List';

type RequestType = 'GET' | 'PUT' | 'POST' | 'DELETE';

export class Api {
  constructor(private serverRoot: string) {}

  public async getInitialData(): Promise<InitialData> {
    const result = await this._sendRequest('user');
    return result as InitialData;
  }

  public async createFamily(name: string): Promise<Family> {
    const result = await this._sendRequest('family', 'PUT', name);
    return result as Family;
  }

  public async inviteMemberToFamily(email: string, familyId: number) {
    const result = await this._sendRequest(`family/${familyId}/members`, 'PUT', email);
    return result as Family;
  }

  public async acceptInvitation(invitationId: number) {
    const result = await this._sendRequest(`invitation/${invitationId}/accept`, 'POST');
    return result as Family;
  }

  public async rejectInvitation(invitationId: number) {
    const result = await this._sendRequest(`invitation/${invitationId}/reject`, 'POST');
    return result as Family;
  }

  public async createList(name: string, familyId: number): Promise<List> {
    const result = await this._sendRequest('list', 'PUT', { name, familyId });
    return result as List;
  }

  public async createProduct(name: string, description: string): Promise<Product> {
    const result = await this._sendRequest('product', 'PUT', { name, description });
    return result as Product;
  }

  public async updateProduct(id: number, name: string, description: string): Promise<Product> {
    const result = await this._sendRequest(`product/${id}`, 'POST', { name, description });
    return result as Product;
  }

  public async getProducts(): Promise<Product[]> {
    const result = await this._sendRequest('product', 'GET');
    return result as Product[];
  }

  public async getProductDetails(id: number): Promise<Product> {
    const result = await this._sendRequest(`product/${id}`, 'GET');
    return result as Product;
  }

  public async _sendRequest<T>(
    endpoint: string,
    method: RequestType = 'GET',
    params?: { [key: string]: string | number } | string
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
