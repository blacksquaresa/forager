import React from 'react';
import { IonAlert } from '@ionic/react';
import { addFamily } from '../store/actions';
import { api } from '../App';

type NewFamilyAlertProps = {
  closeFunction: (isOpen: boolean) => void;
};
const NewFamilyAlert: React.FC<NewFamilyAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Create A New Family"
      inputs={[{ name: 'name', type: 'text', placeholder: 'Enter the name of your family' }]}
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
          text: 'Create Family',
          handler: async (data) => {
            const family = await api.createFamily(data.name);
            addFamily(family);
            props.closeFunction(false);
          }
        }
      ]}
    />
  );
};

export default NewFamilyAlert;
