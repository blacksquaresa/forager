import React from 'react';
import { IonAlert } from '@ionic/react';
import { addProduct } from '../store/actions';
import { api } from '../App';

type NewProductAlertProps = {
  closeFunction: (isOpen: boolean) => void;
};
const NewProductAlert: React.FC<NewProductAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Add A New Product"
      inputs={[
        { name: 'name', type: 'text', placeholder: 'Name: eg: Brown sugar' },
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
          text: 'Add Product',
          handler: async (data) => {
            const product = await api.createProduct(data.name, data.description);
            addProduct(product);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default NewProductAlert;
