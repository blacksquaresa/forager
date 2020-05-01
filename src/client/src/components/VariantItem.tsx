import React from 'react';
import { IonItem, IonIcon, IonLabel } from '@ionic/react';
import { pricetag } from 'ionicons/icons';
import { Variant } from '../models/Variant';
import { quantity } from '../services/Utils';
import EditVariantAlert from '../alerts/EditVariantAlert';
import { Product } from '../models/Product';

type VariantItemrops = {
  product: Product;
  variant: Variant;
  isSelected?: boolean;
};
const VariantItem: React.FC<VariantItemrops> = (props) => {
  const [updateVariantAlertIsUp, setUpdateVariantAlertIsUp] = React.useState(false);
  const color = props.isSelected ? 'primary' : '';
  let heading = [props.variant.brand, quantity(props.variant.quantity, props.product.units), props.variant.container]
    .filter((x) => x)
    .join(', ');
  return (
    <IonItem detail onClick={() => setUpdateVariantAlertIsUp(true)}>
      <IonIcon icon={pricetag} slot="start" />
      <IonLabel>
        <h2>{heading}</h2>
        <p>{props.variant.description}</p>
      </IonLabel>
      {updateVariantAlertIsUp ? (
        <EditVariantAlert product={props.product} variant={props.variant!} closeFunction={setUpdateVariantAlertIsUp} />
      ) : (
        ''
      )}
    </IonItem>
  );
};

export default VariantItem;
