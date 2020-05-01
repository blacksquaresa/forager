import React from 'react';
import { IonAlert } from '@ionic/react';
import { updateVariant } from '../store/actions';
import { api } from '../App';
import { connect } from 'react-redux';
import { Variant } from '../models/Variant';
import { Product } from '../models/Product';

type EditVariantAlertProps = {
  product: Product;
  variant: Variant;
  closeFunction: (isOpen: boolean) => void;
  updateVariant: (product: Product, variant: Variant) => void;
};
const EditVariantAlert: React.FC<EditVariantAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Edit Variant"
      inputs={[
        { name: 'brand', type: 'text', value: props.variant.brand, placeholder: 'Brand: eg: Coca Cola' },
        {
          name: 'quantity',
          type: 'number',
          value: props.variant.quantity.toString(),
          min: 0,
          placeholder: `Quantity in ${props.product.units}s`
        },
        {
          name: 'container',
          type: 'text',
          value: props.variant.container,
          placeholder: 'Container: eg: bag, box, 6 pack'
        },
        {
          name: 'description',
          type: 'text',
          value: props.variant.description,
          placeholder: 'Description eg: Brown Sugar'
        }
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
          text: 'Update Variant',
          handler: async (data) => {
            const variant = await api.updateVariant(
              props.product.id,
              props.variant.id,
              data.brand,
              data.quantity,
              data.container,
              data.description
            );
            props.updateVariant(props.product, variant);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default connect(null, { updateVariant })(EditVariantAlert);
