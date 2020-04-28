import React from 'react';
import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { pricetag } from 'ionicons/icons';
import { Product } from '../models/Product';

type ProductItemProps = {
  product: Product;
  isSelected?: boolean;
};
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const color = props.isSelected ? 'primary' : '';
  return (
    <IonItem color={color} href={`/products/${props.product.id}`} key={props.product.id} detail>
      <IonIcon icon={pricetag} slot="start" />
      <IonLabel>
        <h2>{props.product.name}</h2>
        <p>{props.product.description}</p>
      </IonLabel>
    </IonItem>
  );
};

export default ProductItem;
