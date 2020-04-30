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
        { name: 'name', type: 'text', placeholder: 'Name: eg: Brown sugar' },
        { name: 'description', type: 'text', placeholder: 'Description eg: Brown Sugar' },
        { name: 'quantity', type: 'number', min: 0, placeholder: 'Quantity' },
        { name: 'units', type: 'text', placeholder: 'Units eg: kg, lt, grams' }
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
              data.name,
              data.description,
              data.quantity,
              data.units
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
