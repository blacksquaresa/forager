import React, { ReactNode } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonItem, IonIcon, IonCardContent, IonButton } from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd } from 'ionicons/icons';
import FamilyCard from './FamilyCard';
import { slug } from '../services/Utils';
import { User } from '../models/User';
import './FamilyCards.css';

function drawFamilies(families: Family[], selectedFamily: Family | undefined): ReactNode {
  let result: JSX.Element[] = [];
  families.forEach((family) => {
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} key={slug(family.name)} />);
  });
  return result;
}

type FamilyCardsProps = {
  user: User;
  families: Family[];
  selectedFamily: Family | undefined;
  createNewFamily: Function;
};
const FamilyCards: React.FC<FamilyCardsProps> = (props) => {
  if (!props.families?.length) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>No Families Assigned</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          You have no families assigned to you. Please create a new family, or ask the owner of an existing family to
          add you to it.
        </IonCardContent>
        <IonItem>
          <IonIcon icon={personAdd} slot="start"></IonIcon>
          <IonButton expand="block" onClick={() => props.createNewFamily(true)}>
            Create a new family
          </IonButton>
        </IonItem>
      </IonCard>
    );
  }

  return <div className="card-list">{drawFamilies(props.user.families, props.selectedFamily)}</div>;
};

export default FamilyCards;
