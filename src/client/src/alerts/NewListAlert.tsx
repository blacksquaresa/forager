import React from 'react';
import { IonAlert } from '@ionic/react';
import { api } from '../App';
import { Family } from '../models/Family';

type NewListAlertProps = {
  family: Family;
  successFunction: () => void;
  closeFunction: () => void;
};
const NewListAlert: React.FC<NewListAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Create a new list"
      message={`Create a new list for the ${props.family.name} family.`}
      inputs={[{ name: 'name', type: 'text', placeholder: 'Enter the name of the list' }]}
      buttons={[
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            props.closeFunction();
          }
        },
        {
          text: 'Create List',
          handler: async (data) => {
            await api.createList(data.name, props.family.id);
            props.successFunction();
          }
        }
      ]}
    />
  );
};

export default NewListAlert;
