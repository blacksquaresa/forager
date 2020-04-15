import React from "react";
import { connect } from "react-redux";
import { DataContext } from "../models/DataContext";
import {
  IonTitle,
  IonButtons,
  IonAvatar,
  IonItem,
  IonTabBar,
} from "@ionic/react";
import { User } from "../models/User";

function drawAvatar(props: User) {
  return (
    <IonButtons slot="end">
      <IonItem>
        <IonAvatar slot="start">
          <img src={props.avatar} />
        </IonAvatar>
      </IonItem>
    </IonButtons>
  );
}

const TopToolbar: React.FC<User> = (props) => {
  return (
    <IonTabBar slot="top">
      <IonTitle size="large">Forager</IonTitle>
      {props.isLoggedIn ? drawAvatar(props) : ""}
    </IonTabBar>
  );
};

const mapStateToProps = (state: DataContext) => {
  return state.user;
};

export default connect(mapStateToProps)(TopToolbar);
