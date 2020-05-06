import { Variant } from './Variant';

export type ListItem = {
  id: number;
  name: string;
  description: string;
  units: string;
  variants: Variant[];
  quantity: number;
};
