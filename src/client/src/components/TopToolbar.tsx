import React from 'react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { IonTitle, IonButtons, IonAvatar, IonItem, IonToolbar, IonHeader } from '@ionic/react';
import { User } from '../models/User';
import { getCurrentUser } from '../store/helpers';
import { Mapped } from '../store/types';

function drawAvatar(user: User) {
  return (
    <IonButtons slot="end">
      <IonItem>
        <IonAvatar>
          <img src={user.avatar} />
        </IonAvatar>
      </IonItem>
    </IonButtons>
  );
}

const TopToolbar: React.FC<{ user: Mapped<User> }> = (props) => {
  const user = props.user.toJS() as User;
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle size="large">Forager</IonTitle>
        {user.isLoggedIn ? drawAvatar(user) : ''}
      </IonToolbar>
    </IonHeader>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { user: getCurrentUser(state) };
};

export default connect(mapStateToProps)(TopToolbar);
