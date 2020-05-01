import React from 'react';
import { IonAlert } from '@ionic/react';
import { updateProduct } from '../store/actions';
import { api } from '../App';
import { connect } from 'react-redux';
import { Product } from '../models/Product';

type EditProductAlertProps = {
  product: Product;
  closeFunction: (isOpen: boolean) => void;
  updateProduct: (product: Product) => void;
};
const EditProductAlert: React.FC<EditProductAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Update Product Details"
      inputs={[
        { name: 'name', type: 'text', value: props.product.name, placeholder: 'Name: eg: Brown sugar' },
        {
          name: 'description',
          type: 'text',
          value: props.product.description,
          placeholder: 'Description eg: Brown Sugar'
        },
        { name: 'units', type: 'text', value: props.product.units, placeholder: 'Units, singular eg: kilogram, litre' }
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
          text: 'Update Product',
          handler: async (data) => {
            const product = await api.updateProduct(props.product.id, data.name, data.description, data.units);
            props.updateProduct(product);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default connect(null, { updateProduct })(EditProductAlert);
