import React from 'react';
import { connect } from 'react-redux';
import { IonIcon, IonPopover, IonList, IonListHeader, IonButton } from '@ionic/react';
import { User } from '../models/User';
import { Invitation } from '../models/Invitation';
import { people } from 'ionicons/icons';
import InvitationPopoverItem from './InvitationPopoverItem';
import './InvitationPopover.css';

function drawInvitations(user: User, invitations: Invitation[]) {
  const result: JSX.Element[] = [];
  for (const invitation of invitations) {
    result.push(<InvitationPopoverItem invitation={invitation} user={user} key={invitation.id} />);
  }
  return result;
}

type InvitationsPopoverProps = {
  user?: User;
  invitations?: Invitation[];
  event: Event | null;
  onDidDismiss: (event: Event | null) => void;
};
const InvitationsPopover: React.FC<InvitationsPopoverProps> = (props) => {
  if (!props.event || !props.user || !props.invitations?.length) {
    return null;
  }

  return (
    <IonPopover isOpen={true} onDidDismiss={(e) => props.onDidDismiss(null)} event={props.event}>
      <IonList>
        <IonListHeader>
          <IonIcon icon={people} /> Family Invitations
        </IonListHeader>
        {drawInvitations(props.user, props.invitations)}
      </IonList>
      <IonButton expand="block" size="small" color="light" onClick={() => props.onDidDismiss(null)}>
        Close
      </IonButton>
    </IonPopover>
  );
};

export default connect(null)(InvitationsPopover);
