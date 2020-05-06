import React from 'react';
import { IonItem, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { pricetag, add, remove } from 'ionicons/icons';
import { Product } from '../models/Product';

type ProductSelectorProps = {
  product: Product;
  quantity?: number;
  onChange: (change: number) => void;
};
const ProductSelector: React.FC<ProductSelectorProps> = (props) => {
  const [quantity, setQuantity] = React.useState(props.quantity || 0);
  const color = quantity ? 'primary' : '';
  const badgeColor = quantity ? 'success' : 'medium';

  function changeQuantity(val: number): void {
    setQuantity(quantity + val);
  }

  return (
    <IonItem color={color} key={props.product.id}>
      {quantity ? (
        <IonIcon icon={remove} slot="start" onClick={() => changeQuantity(-1)} />
      ) : (
        <IonIcon icon={pricetag} slot="start" />
      )}
      <IonLabel>
        <h2>
          {props.product.name} ({props.product.units}s)
        </h2>
        <p>{props.product.description}</p>
      </IonLabel>
      <IonBadge color={badgeColor}>{quantity || 0}</IonBadge>
      <IonIcon icon={add} slot="end" onClick={() => changeQuantity(1)} />
    </IonItem>
  );
};

export default ProductSelector;
