import React, { ReactNode } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonAvatar
} from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, person, listCircle, addCircle, checkmarkCircle, people } from 'ionicons/icons';

function drawFamilyMembers(family: Family): ReactNode {
  return (
    <IonItem>
      <IonAvatar>
        <img src={''} />
      </IonAvatar>
    </IonItem>
  );
}

function drawLists(family: Family): ReactNode {
  return (
    <IonItem>
      <IonAvatar>
        <img src={''} />
      </IonAvatar>
    </IonItem>
  );
}

type FamilyCardProps = {
  family: Family;
  isSelected: boolean;
};
const FamilyCard: React.FC<FamilyCardProps> = (props) => {
  return (
    <IonCard>
      <IonCardHeader color="primary">
        <IonItem color="primary">
          <IonIcon icon={people} size="large" slot="start" />
          {props.family.name} Family
        </IonItem>
      </IonCardHeader>

      <IonItem>
        <IonIcon icon={person} slot="start" />
        <IonLabel>Members</IonLabel>
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawFamilyMembers(props.family)}</IonButtons>
      </IonToolbar>

      <IonItem>
        <IonIcon icon={listCircle} slot="start" />
        <IonLabel>Lists</IonLabel>
      </IonItem>
      <IonToolbar>
        <IonButtons slot="start">{drawLists(props.family)}</IonButtons>
      </IonToolbar>

      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>
            <IonIcon icon={personAdd} slot="icon-only" title="Add new member" />
          </IonButton>
          <IonButton>
            <IonIcon icon={addCircle} slot="icon-only" title="Add new list" />
          </IonButton>
          <IonButton>
            <IonIcon icon={checkmarkCircle} slot="icon-only" title="Select as your current working family" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonCard>
  );
};

export default FamilyCard;
