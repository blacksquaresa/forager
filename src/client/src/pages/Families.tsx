import React from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { add } from 'ionicons/icons';
import NewFamilyAlert from '../alerts/NewFamilyAlert';
import FamilyList from '../components/FamilyList';
import TopToolbar from '../components/TopToolbar';
import { DataContext } from '../models/DataContext';
import { Family } from '../models/Family';
import { User } from '../models/User';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';

type FamiliesProps = {
  user: Mapped<User>;
  families: List<Mapped<Family>>;
};
const Families: React.FC<FamiliesProps> = (props) => {
  const [createNewFamilyAlertIsUp, setCreateNewFamilyAlertIsUp] = React.useState(false);
  const user = helpers.toUser(props.user);
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setCreateNewFamilyAlertIsUp(true)} />
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
        <FamilyList user={user!} families={user!.families} createNewFamily={setCreateNewFamilyAlertIsUp} />
      </IonContent>
      {createNewFamilyAlertIsUp ? <NewFamilyAlert closeFunction={setCreateNewFamilyAlertIsUp} /> : ''}
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    user: helpers.getCurrentUser(state),
    families: helpers.getFamilies(state)
  };
};

export default connect(mapStateToProps)(Families);
