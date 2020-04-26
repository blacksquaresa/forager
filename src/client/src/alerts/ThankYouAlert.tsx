import React from 'react';
import { IonAlert } from '@ionic/react';

type ThankYouAlertProps = {
  isOpen: boolean;
  message: string | false;
  onClose: () => void;
};
const ThankYouAlert: React.FC<ThankYouAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={props.isOpen}
      header="Thank You"
      message={props.message || 'Thank you'}
      buttons={[
        {
          text: 'Close',
          handler: props.onClose
        }
      ]}
    />
  );
};

export default ThankYouAlert;
