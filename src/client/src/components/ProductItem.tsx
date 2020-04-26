import React from 'react';
import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { pricetag } from 'ionicons/icons';
import { Product } from '../models/Product';

type ProductItemProps = {
  product: Product;
  isSelected?: boolean;
};
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const color = props.isSelected ? 'primary' : 'secondary';
  return (
    <IonItem color={color} href={`/product/${props.product.id}`} key={props.product.id} detail>
      <IonIcon icon={pricetag} slot="start" />
      <IonLabel>{props.product.name}</IonLabel>
      <IonLabel>{props.product.description}</IonLabel>
    </IonItem>
  );
};

export default ProductItem;
