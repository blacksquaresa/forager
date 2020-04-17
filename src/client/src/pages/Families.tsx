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
  IonAlert,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import TopToolbar from '../components/TopToolbar';
import { Family } from '../models/Family';
import FamilyCard from '../components/FamilyCard';
import { personAdd, add } from 'ionicons/icons';
import { addFamily } from '../store/actions';
import { api } from '../App';
import { getCurrentFamily, getCurrentUser, getFamilies, toUser, toFamily } from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { slug } from '../services/Utils';
import './Families.css';

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
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} key={slug(family.name)} />);
  });
  return result;
}

type FamiliesProps = {
  user: Mapped<User>;
  families: List<Mapped<Family>>;
  selectedFamily?: Mapped<Family>;
  addFamily: (family: Family) => void;
};
const Families: React.FC<FamiliesProps> = (props) => {
  const [createNewFamilyModalUp, setCreateNewFamilyModalUp] = React.useState(false);
  const user = toUser(props.user);
  const family = toFamily(props.selectedFamily);
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setCreateNewFamilyModalUp(true)} />
          </IonFabButton>
        </IonFab>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Families</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Families are groups of people who share access to lists. All members of a family have equal rights to the
            family's lists. All the families you are a member of are listed here.
          </IonCardContent>
        </IonCard>
        <div className="card-list">{drawFamilies(user!.families, family, setCreateNewFamilyModalUp)}</div>
      </IonContent>
      {createNewFamilyModalUp ? drawNewFamilyModal(setCreateNewFamilyModalUp) : ''}
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { user: getCurrentUser(state), families: getFamilies(state), selectedFamily: getCurrentFamily(state) };
};

export default connect(mapStateToProps, { addFamily })(Families);
