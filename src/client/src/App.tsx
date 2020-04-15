import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLoading,
  IonTitle,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { ellipse, square, triangle } from "ionicons/icons";
import Home from "./pages/Home";
import CurrentUser from "./pages/CurrentUser";
import Tab3 from "./pages/Tab3";
import { connect } from "react-redux";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { DataContext } from "./models/DataContext";
import { Api } from "./services/Api";
import { User } from "./models/User";
import { setUser } from "./store/actions/userActions";
import TopToolbar from "./components/TopToolbar";
import BottomToolbar from "./components/BottomToolbar";

export const api = new Api("/api");

async function authenticateUser(): Promise<User> {
  var user = await api.getCurrentUser();
  return {
    ...user,
    isLoggedIn: true,
  };
}

type AppProps = {
  isLoggedIn: boolean;
  setUser: (user: User) => void;
};
const App: React.FC<AppProps> = (props) => {
  if (!props.isLoggedIn) {
    authenticateUser().then((user) => {
      props.setUser(user);
    });
    return <IonLoading isOpen={true} message={"Please wait..."} />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <TopToolbar />
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/user" component={CurrentUser} exact={true} />
            <Route path="/tab3" component={Tab3} />
            <Route
              path="/"
              render={() => <Redirect to="/home" />}
              exact={true}
            />
          </IonRouterOutlet>
          <BottomToolbar />
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state: DataContext) => {
  return { isLoggedIn: state.user.isLoggedIn };
};

export default connect(mapStateToProps, { setUser })(App);
