import React from 'react';
import { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { connect } from 'react-redux';
import './Home.css';
import TopToolbar from '../components/TopToolbar';
import { DataContext } from '../models/DataContext';
import { User } from '../models/User';
import { getCurrentUser } from '../store/helpers';
import { Mapped } from '../store/types';

type HomeProps = {
  user: Mapped<User>;
};
const Home: React.FC<HomeProps> = (props) => {
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Welcome to Forager</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>Forager is an app badly in need of copy writing and art work</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { user: getCurrentUser(state) };
};

export default connect(mapStateToProps)(Home);
