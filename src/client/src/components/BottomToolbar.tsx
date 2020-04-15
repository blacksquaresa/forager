import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { triangle, ellipse, square } from "ionicons/icons";

const BottomToolbar: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={triangle} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="user" href="/user">
        <IonIcon icon={ellipse} />
        <IonLabel>Current User</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tab3">
        <IonIcon icon={square} />
        <IonLabel>Tab 3</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default BottomToolbar;
