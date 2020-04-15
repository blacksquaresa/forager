import React from 'react';
import { IonContent, IonPage, IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import TopToolbar from '../components/TopToolbar';

const CurrentUser: React.FC<User> = (props) => {
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonItem>
          <IonAvatar slot="start">
            <img src={props.avatar} />
          </IonAvatar>
          <IonLabel color="primary">{props.name}</IonLabel>
          <IonLabel color="secondary">{props.email}</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: DataContext) => {
  return state.user;
};

export default connect(mapStateToProps)(CurrentUser);
