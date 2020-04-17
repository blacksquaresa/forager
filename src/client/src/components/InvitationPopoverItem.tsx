import React from 'react';
import { connect } from 'react-redux';
import { IonButtons, IonIcon, IonItem, IonLabel, IonButton } from '@ionic/react';
import { User } from '../models/User';
import { Invitation } from '../models/Invitation';
import { trash, checkmarkCircleOutline } from 'ionicons/icons';
import { acceptInvitation, rejectInvitation } from '../store/actions';
import { api } from '../App';
import { Family } from '../models/Family';

async function onAcceptInvitation(
  invitation: Invitation,
  acceptInvitation: (invitation: Invitation, family: Family) => void
): Promise<void> {
  const newFamily = await api.acceptInvitation(invitation.id);
  acceptInvitation(invitation, newFamily);
}

async function onRejectInvitation(
  invitation: Invitation,
  rejectInvitation: (invitation: Invitation) => void
): Promise<void> {
  await api.rejectInvitation(invitation.id);
  rejectInvitation(invitation);
}

type InvitationsPopoverProps = {
  user: User;
  invitation: Invitation;
  acceptInvitation: (invitation: Invitation, family: Family) => void;
  rejectInvitation: (invitation: Invitation) => void;
};
const InvitationPopoverItem: React.FC<InvitationsPopoverProps> = (props) => {
  const date = new Date(props.invitation.invitedOn);
  return (
    <IonItem>
      <IonLabel position="stacked" color="primary">
        {props.invitation.source}
      </IonLabel>
      <IonLabel position="stacked">has invited you to join the</IonLabel>
      <IonLabel position="stacked" color="secondary">
        {props.invitation.family} family
      </IonLabel>
      <IonLabel position="stacked" color="medium">
        {date.toLocaleDateString()}
      </IonLabel>
      <IonButtons slot="end">
        <IonButton color="success" onClick={(e) => onAcceptInvitation(props.invitation, props.acceptInvitation)}>
          <IonIcon icon={checkmarkCircleOutline} />
        </IonButton>
        <IonButton onClick={(e) => onRejectInvitation(props.invitation, props.rejectInvitation)}>
          <IonIcon icon={trash} />
        </IonButton>
      </IonButtons>
    </IonItem>
  );
};

export default connect(null, { acceptInvitation, rejectInvitation })(InvitationPopoverItem);
