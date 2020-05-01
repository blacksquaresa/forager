import React from 'react';
import { IonAlert } from '@ionic/react';
import { addVariant } from '../store/actions';
import { api } from '../App';
import { connect } from 'react-redux';
import { Variant } from '../models/Variant';
import { Product } from '../models/Product';

type NewVariantAlertProps = {
  product: Product;
  closeFunction: (isOpen: boolean) => void;
  addVariant: (product: Product, variant: Variant) => void;
};
const NewVariantAlert: React.FC<NewVariantAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Add A New Variant"
      inputs={[
        { name: 'brand', type: 'text', placeholder: 'Brand: eg: Coca Cola' },
        { name: 'quantity', type: 'number', min: 0, placeholder: `Quantity in ${props.product.units}s` },
        { name: 'container', type: 'text', placeholder: 'Container: eg: bag, box, 6 pack' },
        { name: 'description', type: 'text', placeholder: 'Description eg: Brown Sugar' }
      ]}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            props.closeFunction(false);
          }
        },
        {
          text: 'Add Variant',
          handler: async (data) => {
            const variant = await api.createVariant(
              props.product.id,
              data.brand,
              data.quantity,
              data.container,
              data.description
            );
            props.addVariant(props.product, variant);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default connect(null, { addVariant })(NewVariantAlert);
