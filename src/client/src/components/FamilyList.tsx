import React, { ReactNode, ReactElement } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonCardContent,
  IonButton,
  IonList,
  IonLabel
} from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, people } from 'ionicons/icons';
import FamilyListItemOpen from './FamilyListItemOpen';
import { slug } from '../services/Utils';
import { User } from '../models/User';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { DataContext } from '../models/DataContext';
import { connect } from 'react-redux';

function drawNoFamily(props: FamilyListProps): ReactElement<FamilyListProps, string> {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>No Families Assigned</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        You have no families assigned to you. Please create a new family, or ask the owner of an existing family to add
        you to it.
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

function drawFamilies(families: Family[], selectedFamilyId: number, onSelect: (id: number) => void): ReactNode {
  let result: JSX.Element[] = [];
  families.forEach((family) => {
    const isOpen = family.id === selectedFamilyId;
    if (isOpen) {
      result.push(
        <IonItem button onClick={() => onSelect(-1)} color="primary" detail key={family.id}>
          <IonIcon icon={people} size="large" slot="start" />
          <IonLabel>{family.name}</IonLabel>
        </IonItem>
      );
      result.push(
        <FamilyListItemOpen family={family} isSelected={family.id === selectedFamilyId} key={slug(family.name)} />
      );
    } else {
      result.push(
        <IonItem button onClick={() => onSelect(family.id)} color="medium" detail key={family.id}>
          <IonIcon icon={people} size="large" slot="start" />
          <IonLabel>{family.name}</IonLabel>
        </IonItem>
      );
    }
  });
  return result;
}

type FamilyListProps = {
  user: User;
  families: Family[];
  currentFamily: Mapped<Family> | undefined;
  createNewFamily: Function;
};
const FamilyList: React.FC<FamilyListProps> = (props) => {
  const currentFamily = helpers.toFamily(props.currentFamily);
  const [isOpen, setIsOpen] = React.useState(currentFamily?.id || props?.families?.[0].id || 0);

  if (!props.families?.length) {
    return drawNoFamily(props);
  }

  return <IonList lines="full">{drawFamilies(props.user.families, isOpen, setIsOpen)}</IonList>;
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    currentFamily: helpers.getCurrentFamily(state)
  };
};

export default connect(mapStateToProps)(FamilyList);
