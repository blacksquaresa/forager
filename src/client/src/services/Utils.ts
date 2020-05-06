import { Api } from './Api';
import { Product } from '../models/Product';

export function slug(source: string): string {
  return String(source).trim().toLowerCase().replace(/[\W]+/g, '');
}

export function quantity(quantity: number, units: string): string {
  return `${quantity} ${units}${quantity === 1 ? '' : 's'}`;
}

export function checkForNewProducts(
  api: Api,
  updateProductState: (products: Product[]) => void,
  setCheckedForNewProducts: (val: boolean) => void
): void {
  api.getProducts().then((products: Product[]) => {
    setCheckedForNewProducts(true);
    updateProductState(products);
  });
}
