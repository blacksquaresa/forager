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
  IonChip,
  IonButton
} from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, person, people, listCircle, list, add, addCircle, addCircleOutline } from 'ionicons/icons';
import ThankYouAlert from '../alerts/ThankYouAlert';
import NewMemberAlert from '../alerts/NewMemberAlert';
import Avatar from './Avatar';
import NewListAlert from '../alerts/NewListAlert';

function drawLists(family: Family): ReactNode {
  let result: JSX.Element[] = [];
  family.lists?.forEach((list) => {
    result.push(
      <IonButton key={list.id}>
        <IonChip>
          <IonIcon icon={listCircle} />
          <IonLabel>{list.name}</IonLabel>
        </IonChip>
      </IonButton>
    );
  });
  return result;
}

function drawFamilyMembers(family: Family): ReactNode {
  let result: JSX.Element[] = [];
  family.members?.forEach((member) => {
    result.push(<Avatar member={member} key={member.id} />);
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
  const [AddNewListShowing, setAddNewListShowing] = React.useState(false);
  const [thankYouShowing, setthankYouShowing] = React.useState(false);
  return (
    <IonCard>
      <IonCardHeader color={color}>
        <IonItem color={color}>
          <IonIcon icon={people} size="large" slot="start" />
          <IonCardTitle>{props.family.name}</IonCardTitle>
        </IonItem>
      </IonCardHeader>

      <IonItem>
        <IonIcon icon={person} slot="start" />
        <IonLabel>Members ({props.family.members?.length || 0})</IonLabel>
        <IonIcon icon={personAdd} slot="end" title="Add new member" onClick={() => setinviteNewMemberShowing(true)} />
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawFamilyMembers(props.family)}</IonButtons>
      </IonToolbar>

      <IonItem>
        <IonIcon icon={list} slot="start" />
        <IonLabel>Lists ({props.family.lists?.length || 0})</IonLabel>
        <IonIcon icon={addCircleOutline} slot="end" title="Add new list" onClick={() => setAddNewListShowing(true)} />
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawLists(props.family)}</IonButtons>
      </IonToolbar>

      {inviteNewMemberShowing ? (
        <NewMemberAlert
          familyId={props.family.id}
          successFunction={() => {
            setthankYouShowing(true);
            setinviteNewMemberShowing(false);
          }}
          closeFunction={() => setinviteNewMemberShowing(false)}
        />
      ) : (
        ''
      )}

      {AddNewListShowing ? (
        <NewListAlert
          family={props.family}
          successFunction={() => {
            setAddNewListShowing(false);
          }}
          closeFunction={() => setAddNewListShowing(false)}
        />
      ) : (
        ''
      )}
      {thankYouShowing ? (
        <ThankYouAlert
          onClose={() => setthankYouShowing(false)}
          message="Thank you for your invitation. It has been registered, and your invitee will receive it the next time they log in."
        />
      ) : (
        ''
      )}
    </IonCard>
  );
};

export default FamilyCard;
