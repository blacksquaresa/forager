import { Variant } from './Variant';

export type Product = {
  id: number;
  name: string;
  description: string;
  variants: Variant[];
};
