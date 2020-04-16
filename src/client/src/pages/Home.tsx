import React, { ReactNode } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { connect } from 'react-redux';
import './Home.css';
import TopToolbar from '../components/TopToolbar';
import { DataContext } from '../models/DataContext';
import { Redirect } from 'react-router';
import { User } from '../models/User';
import { Family } from '../models/Family';
import FamilyCard from '../components/FamilyCard';
import { getCurrentUser, getCurrentFamily, toUser, toFamily } from '../store/helpers';
import { Mapped } from '../store/types';
import { slug } from '../services/Utils';

function drawNoFamilies(): ReactNode {
  return <Redirect to="families" />;
}

function drawFamilies(families: Family[], selectedFamily?: Family): ReactNode {
  let result: JSX.Element[] = [];
  families.forEach((family) => {
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} key={slug(family.name)} />);
  });
  return result;
}

function drawContent(props: HomeProps): ReactNode {
  const user = toUser(props.user);
  if (user?.families?.length) {
    const family = toFamily(props.family);
    return drawFamilies(user.families, family);
  }

  return drawNoFamilies();
}

type HomeProps = {
  user: Mapped<User>;
  family?: Mapped<Family>;
};
const Home: React.FC<HomeProps> = (props) => {
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>{drawContent(props)}</IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return { user: getCurrentUser(state), selectedFamily: getCurrentFamily(state) };
};

export default connect(mapStateToProps)(Home);
