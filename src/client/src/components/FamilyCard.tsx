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
  IonAvatar
} from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, person, checkmarkCircle, people } from 'ionicons/icons';

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
  return (
    <IonCard>
      <IonCardHeader color={color}>
        <IonItem color={color}>
          <IonIcon icon={people} size="large" slot="start" />
          <IonCardTitle>{props.family.name} Family</IonCardTitle>
          {props.isSelected ? (
            ''
          ) : (
            <IonIcon icon={checkmarkCircle} slot="end" title="Select as your current working family" />
          )}
        </IonItem>
      </IonCardHeader>

      <IonItem>
        <IonIcon icon={person} slot="start" />
        <IonLabel>Members</IonLabel>
        <IonIcon icon={personAdd} slot="end" title="Add new member" />
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawFamilyMembers(props.family)}</IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default FamilyCard;
