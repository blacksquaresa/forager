import React from 'react';
import { IonAlert } from '@ionic/react';

type ThankYouAlertProps = {
  message: string;
  onClose: () => void;
};
const ThankYouAlert: React.FC<ThankYouAlertProps> = (props) => {
  return (
    <IonAlert
      isOpen={true}
      header="Thank You"
      message={props.message}
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
