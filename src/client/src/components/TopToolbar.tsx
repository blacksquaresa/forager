import React from 'react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import {
  IonTitle,
  IonButtons,
  IonAvatar,
  IonItem,
  IonToolbar,
  IonHeader,
  IonButton,
  IonBadge,
  IonIcon
} from '@ionic/react';
import { User } from '../models/User';
import { getCurrentUser, getInvitations, toUser, toInvitationArray } from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { Invitation } from '../models/Invitation';
import { people } from 'ionicons/icons';
import InvitationsPopover from './InvitationsPopover';

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

function drawAvatar(user: User) {
  return (
    <IonItem>
      <IonAvatar>
        <img src={user.avatar} alt={user.name} />
      </IonAvatar>
    </IonItem>
  );
}

function drawButtons(setInvitationsClickEvent: Function, user?: User, invitations?: Invitation[]) {
  if (!user && !invitations?.length) {
    return '';
  }
  return (
    <IonButtons slot="end">
      {invitations?.length ? drawInvitationBadge(invitations, setInvitationsClickEvent) : ''}
      {user?.isLoggedIn ? drawAvatar(user) : ''}
    </IonButtons>
  );
}

type TopToolbarProps = {
  user: Mapped<User>;
  invitations: List<Mapped<Invitation>>;
};
const TopToolbar: React.FC<TopToolbarProps> = (props) => {
  const user = toUser(props.user);
  const invitations = toInvitationArray(props.invitations);
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
  return { user: getCurrentUser(state), invitations: getInvitations(state) };
};

export default connect(mapStateToProps)(TopToolbar);
