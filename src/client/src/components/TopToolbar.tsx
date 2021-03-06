import React from 'react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { IonTitle, IonButtons, IonToolbar, IonHeader, IonButton, IonBadge, IonIcon } from '@ionic/react';
import { User } from '../models/User';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { Invitation } from '../models/Invitation';
import { people } from 'ionicons/icons';
import InvitationsPopover from './InvitationsPopover';
import Avatar from './Avatar';

function drawInvitationBadge(invitations: Invitation[], setInvitationsClickEvent: Function) {
  return (
    <IonButton
      title={`You have ${invitations.length} invitation${invitations.length > 1 ? 's' : ''} to join families`}
      onClick={(e) => {
        e.persist();
        setInvitationsClickEvent(e);
      }}
    >
      <IonBadge color="success">
        <IonIcon icon={people} />
        {' ' + invitations.length}
      </IonBadge>
    </IonButton>
  );
}

function drawButtons(setInvitationsClickEvent: Function, user?: User, invitations?: Invitation[]) {
  if (!user && !invitations?.length) {
    return '';
  }
  return (
    <IonButtons slot="end">
      {invitations?.length ? drawInvitationBadge(invitations, setInvitationsClickEvent) : ''}
      {user?.isLoggedIn ? <Avatar member={user} /> : ''}
    </IonButtons>
  );
}

type TopToolbarProps = {
  user: Mapped<User>;
  invitations: List<Mapped<Invitation>>;
};
const TopToolbar: React.FC<TopToolbarProps> = (props) => {
  const user = helpers.toUser(props.user);
  const invitations = helpers.toArray(props.invitations);
  const [invitationsClickEvent, setInvitationsClickEvent] = React.useState<Event | null>(null);
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle size="large">Forager</IonTitle>
        {drawButtons(setInvitationsClickEvent, user, invitations)}
      </IonToolbar>
      <InvitationsPopover
        event={invitationsClickEvent}
        onDidDismiss={setInvitationsClickEvent}
        user={user}
        invitations={invitations}
      />
    </IonHeader>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { user: helpers.getCurrentUser(state), invitations: helpers.getInvitations(state) };
};

export default connect(mapStateToProps)(TopToolbar);
