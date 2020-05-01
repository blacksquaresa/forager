import { Family } from '../models/Family';
import { InitialData } from '../models/InitialData';
import { Product } from '../models/Product';
import { List } from '../models/List';
import { Variant } from '../models/Variant';
import store from '../store/store';
import helpers from '../store/helpers';

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

  public async createProduct(name: string, description: string, units: string): Promise<Product> {
    const result = await this._sendRequest('product', 'PUT', { name, description, units });
    return result as Product;
  }

  public async updateProduct(id: number, name: string, description: string, units: string): Promise<Product> {
    const result = await this._sendRequest(`product/${id}`, 'POST', { name, description, units });
    return result as Product;
  }

  public async getProducts(): Promise<Product[]> {
    const state = store.getState();
    const productIds = helpers.toArray(helpers.getProducts(state))?.map((p) => p.id);
    const result = await this._sendRequest('product', 'POST', productIds);
    return result as Product[];
  }

  public async getProductDetails(id: number): Promise<Product> {
    const state = store.getState();
    const stateProduct = helpers.getProduct(state, id);
    let product: Product;
    if (stateProduct && stateProduct.has('variants') && stateProduct.get('variants').size) {
      product = helpers.toProduct(stateProduct)!;
    } else {
      product = await this._sendRequest(`product/${id}`, 'GET');
    }
    return product;
  }

  public async createVariant(
    productId: number,
    brand: string,
    quantity: number,
    container: string,
    description: string
  ): Promise<Variant> {
    const result = await this._sendRequest(`product/${productId}/variant`, 'PUT', {
      brand,
      quantity,
      container,
      description
    });
    return result as Variant;
  }

  public async updateVariant(
    productId: number,
    variantId: number,
    brand: string,
    quantity: number,
    container: string,
    description: string
  ): Promise<Variant> {
    const result = await this._sendRequest(`product/${productId}/variant/${variantId}`, 'POST', {
      brand,
      quantity,
      container,
      description
    });
    return result as Variant;
  }

  public async _sendRequest<T>(
    endpoint: string,
    method: RequestType = 'GET',
    params?: { [key: string]: string | number } | string | (string | number)[]
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
