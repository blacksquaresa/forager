import React, { ReactNode } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonLabel,
  IonToolbar,
  IonButtons,
  IonAvatar,
  IonAlert
} from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, person, checkmarkCircle, people } from 'ionicons/icons';
import { api } from '../App';

function drawThankYouAlert(showModal: Function): ReactNode {
  return (
    <IonAlert
      isOpen={true}
      header="Thank You"
      message="Thank you for your invitation. It has been registered, and your invitee will receive it the next time they log in."
      buttons={[
        {
          text: 'Close',
          handler: async () => {
            showModal(false);
          }
        }
      ]}
    />
  );
}

function drawNewMemberModal(showModal: Function, familyId: number, showThankYou: Function): ReactNode {
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
            showModal(false);
          }
        },
        {
          text: 'Send Invitation',
          handler: async (data) => {
            await api.inviteMemberToFamily(data.email, familyId);
            showThankYou(true);
            showModal(false);
          }
        }
      ]}
    />
  );
}

function drawFamilyMembers(family: Family): ReactNode {
  let result: JSX.Element[] = [];
  family.members?.forEach((member) => {
    result.push(
      <IonItem>
        <IonAvatar>
          <img src={member.avatar} />
        </IonAvatar>
      </IonItem>
    );
  });

  return result;
}

type FamilyCardProps = {
  family: Family;
  isSelected: boolean;
  key: string;
};
const FamilyCard: React.FC<FamilyCardProps> = (props) => {
  const color = props.isSelected ? 'primary' : 'secondary';
  const [inviteNewMemberShowing, setinviteNewMemberShowing] = React.useState(false);
  const [thankYouShowing, setthankYouShowing] = React.useState(false);
  return (
    <IonCard>
      <IonCardHeader color={color}>
        <IonItem color={color}>
          <IonIcon icon={people} size="large" slot="start" />
          <IonCardTitle>{props.family.name} Family</IonCardTitle>
        </IonItem>
      </IonCardHeader>

      <IonItem>
        <IonIcon icon={person} slot="start" />
        <IonLabel>Members</IonLabel>
        <IonIcon icon={personAdd} slot="end" title="Add new member" onClick={() => setinviteNewMemberShowing(true)} />
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawFamilyMembers(props.family)}</IonButtons>
      </IonToolbar>
      {inviteNewMemberShowing ? drawNewMemberModal(setinviteNewMemberShowing, props.family.id, setthankYouShowing) : ''}
      {thankYouShowing ? drawThankYouAlert(setthankYouShowing) : ''}
    </IonCard>
  );
};

export default FamilyCard;
