import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonLoading } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, home } from 'ionicons/icons';
import Home from './pages/Home';
import { connect } from 'react-redux';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { DataContext } from './models/DataContext';
import { Api } from './services/Api';
import { addInitialData } from './store/actions';
import Families from './pages/Families';
import { InitialData } from './models/InitialData';
import { isLoggedIn } from './store/helpers';
import { Mapped } from './store/types';

export const api = new Api('/api');

function authenticateUser(props: AppProps): void {
  api.getInitialData().then((initialData: InitialData) => {
    props.addInitialData(initialData);
  });
}

type AppProps = {
  isLoggedIn: boolean;
  addInitialData: (data: InitialData) => void;
};
const App: React.FC<AppProps> = (props) => {
  if (!props.isLoggedIn) {
    authenticateUser(props);
    return <IonLoading isOpen={true} message={'Please wait...'} />;
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact={true} />
            <Route path="/families" component={Families} exact={true} />
            <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="families" href="/families">
              <IonIcon icon={people} />
              <IonLabel>Families</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { isLoggedIn: isLoggedIn(state) };
};

export default connect(mapStateToProps, { addInitialData })(App);
