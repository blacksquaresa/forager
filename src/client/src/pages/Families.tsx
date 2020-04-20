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
import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import TopToolbar from '../components/TopToolbar';
import { Family } from '../models/Family';
import { addFamily } from '../store/actions';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import FamilyCards from '../components/FamilyCards';
import { add } from 'ionicons/icons';
import NewFamilyAlert from '../alerts/NewFamilyAlert';

type FamiliesProps = {
  user: Mapped<User>;
  families: List<Mapped<Family>>;
  selectedFamily?: Mapped<Family>;
  addFamily: (family: Family) => void;
};
const Families: React.FC<FamiliesProps> = (props) => {
  const [createNewFamilyAlertIsUp, setCreateNewFamilyAlertIsUp] = React.useState(false);
  const user = helpers.toUser(props.user);
  const family = helpers.toFamily(props.selectedFamily);
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
        <FamilyCards
          user={user!}
          families={user!.families}
          selectedFamily={family}
          createNewFamily={setCreateNewFamilyAlertIsUp}
        />
      </IonContent>
      {createNewFamilyAlertIsUp ? <NewFamilyAlert closeFunction={setCreateNewFamilyAlertIsUp} /> : ''}
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    user: helpers.getCurrentUser(state),
    families: helpers.getFamilies(state),
    selectedFamily: helpers.getCurrentFamily(state)
  };
};

export default connect(mapStateToProps, { addFamily })(Families);
