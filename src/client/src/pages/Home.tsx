import React, { ReactNode } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { connect } from 'react-redux';
import './Home.css';
import TopToolbar from '../components/TopToolbar';
import { DataContext } from '../models/DataContext';
import { Redirect } from 'react-router';
import { User } from '../models/User';
import { Family } from '../models/Family';
import FamilyCard from '../components/FamilyCard';

function drawNoFamilies(): ReactNode {
  return <Redirect to="families" />;
}

function drawFamilies(families: Family[], selectedFamily?: Family): ReactNode {
  let result: JSX.Element[] = [];
  families.forEach((family) => {
    result.push(<FamilyCard family={family} isSelected={family.id === selectedFamily?.id} />);
  });
  return result;
}

function drawContent(props: HomeProps): ReactNode {
  if (props.user.families?.length) {
    return drawFamilies(props.user.families, props.family);
  }

  return drawNoFamilies();
}

type HomeProps = {
  user: User;
  family?: Family;
};
const Home: React.FC<HomeProps> = (props) => {
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>{drawContent(props)}</IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: DataContext) => {
  return { user: state.user, family: state.family };
};

export default connect(mapStateToProps)(Home);
