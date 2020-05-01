import React from 'react';
import { IonAlert } from '@ionic/react';
import { addProduct } from '../store/actions';
import { api } from '../App';
import { connect } from 'react-redux';
import { Product } from '../models/Product';

type NewProductAlertProps = {
  closeFunction: (isOpen: boolean) => void;
  addProduct: (product: Product) => void;
};
const NewProductAlert: React.FC<NewProductAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Add A New Product"
      inputs={[
        { name: 'name', type: 'text', placeholder: 'Name: eg: Brown sugar' },
        { name: 'description', type: 'text', placeholder: 'Description eg: Brown Sugar' },
        { name: 'units', type: 'text', placeholder: 'Units, singular eg: kilogram, litre' }
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
          text: 'Add Product',
          handler: async (data) => {
            const product = await api.createProduct(data.name, data.description, data.units);
            props.addProduct(product);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default connect(null, { addProduct })(NewProductAlert);
