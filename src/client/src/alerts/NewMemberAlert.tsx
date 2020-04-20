import React from 'react';
import { IonAlert } from '@ionic/react';
import { api } from '../App';

type NewMemberAlertProps = {
  familyId: number;
  successFunction: () => void;
  closeFunction: () => void;
};
const NewMemberAlert: React.FC<NewMemberAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Invite a new Member"
      message="Invite a new member to join this family by entering their email address."
      inputs={[{ name: 'email', type: 'email', placeholder: 'Enter the email address' }]}
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
          text: 'Send Invitation',
          handler: async (data) => {
            await api.inviteMemberToFamily(data.email, props.familyId);
            props.successFunction();
          }
        }
      ]}
    />
  );
};

export default NewMemberAlert;
