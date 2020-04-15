import React, { ReactNode } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonButton,
  IonCardContent,
  IonAlert
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import TopToolbar from '../components/TopToolbar';
import { Family } from '../models/Family';
import FamilyCard from '../components/FamilyCard';
import { personAdd } from 'ionicons/icons';
import { addFamily } from '../store/actions/userActions';
import { api } from '../App';

function drawNewFamilyModal(showModal: Function): ReactNode {
  return (
    <IonAlert
      isOpen={true}
      header="Create A New Family"
      inputs={[{ name: 'name', type: 'text', placeholder: 'Enter the name of your family' }]}
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
          text: 'Create Family',
          handler: async (data) => {
            const family = await api.createFamily(data.name);
            addFamily(family);
            showModal(false);
          }
        }
      ]}
    />
  );
}

function drawFamilies(families: Family[], selectedFamily: Family | undefined, clickAction: Function): ReactNode {
  if (!families?.length) {
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
          <IonButton expand="block" onClick={() => clickAction(true)}>
            Create a new family
          </IonButton>
        </IonItem>
      </IonCard>
    );
  }
  let result: JSX.Element[] = [];
  families.forEach((family) => {
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} />);
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} />);
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} />);
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} />);
  });
  return result;
}

type FamiliesProps = {
  user: User;
  family?: Family;
  addFamily: (family: Family) => void;
};
const Families: React.FC<FamiliesProps> = (props) => {
  const [createNewFamilyModalUp, setCreateNewFamilyModalUp] = React.useState(false);
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>{drawFamilies(props.user.families, props.family, setCreateNewFamilyModalUp)}</IonContent>
      {createNewFamilyModalUp ? drawNewFamilyModal(setCreateNewFamilyModalUp) : ''}
    </IonPage>
  );
};

const mapStateToProps = (state: DataContext) => {
  return { user: state.user, selectedFamily: state.family };
};

export default connect(mapStateToProps, { addFamily })(Families);
