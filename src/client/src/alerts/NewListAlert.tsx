import React from 'react';
import { IonAlert } from '@ionic/react';
import { api } from '../App';
import { Family } from '../models/Family';
import { connect } from 'react-redux';
import { addList } from '../store/actions';
import { List } from '../models/List';

type NewListAlertProps = {
  isOpen: boolean;
  family: Family;
  successFunction: () => void;
  closeFunction: () => void;
  addList: (list: List, familyId: number) => void;
};
const NewListAlert: React.FC<NewListAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={props.isOpen}
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
            const list = await api.createList(data.name, props.family.id);
            props.addList(list, props.family.id);
            props.successFunction();
          }
        }
      ]}
    />
  );
};

export default connect(null, { addList })(NewListAlert);
