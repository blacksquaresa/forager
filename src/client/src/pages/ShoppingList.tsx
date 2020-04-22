import React from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import TopToolbar from '../components/TopToolbar';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { List as ListModel } from '../models/List';
import { add } from 'ionicons/icons';
import { useParams } from 'react-router-dom';

type ShoppingListProps = {
  lists: List<Mapped<ListModel>>;
};
const ShoppingList: React.FC<ShoppingListProps> = (props) => {
  let { id } = useParams();
  const [newProductIsUp, setNewProductIsUp] = React.useState(false);
  const list = helpers.toList(props.lists.find((l) => l.get('id') == id));
  if (!list) {
    return (
      <IonPage>
        <TopToolbar />
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle color="danger">List Not Found</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>Oops, we could not find the list you are looking for.</IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setNewProductIsUp(true)} />
          </IonFabButton>
        </IonFab>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{list.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Some cool copy about this list. Where do we get the copy from? Who knows. Problem for an older person.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    lists: helpers.getLists(state)
  };
};

export default connect(mapStateToProps)(ShoppingList);
