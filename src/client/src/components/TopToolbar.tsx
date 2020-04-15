import React from "react";
import { connect } from "react-redux";
import { DataContext } from "../models/DataContext";
import {
  IonTitle,
  IonButtons,
  IonAvatar,
  IonItem,
  IonToolbar,
  IonHeader,
} from "@ionic/react";
import { User } from "../models/User";

function drawAvatar(props: User) {
  return (
    <IonButtons slot="end">
      <IonItem>
        <IonAvatar>
          <img src={props.avatar} />
        </IonAvatar>
      </IonItem>
    </IonButtons>
  );
}

const TopToolbar: React.FC<User> = (props) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle size="large">Forager</IonTitle>
        {props.isLoggedIn ? drawAvatar(props) : ""}
      </IonToolbar>
    </IonHeader>
  );
};

const mapStateToProps = (state: DataContext) => {
  return state.user;
};

export default connect(mapStateToProps)(TopToolbar);
