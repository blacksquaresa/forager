import React, { ReactElement } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonFab,
  IonFabButton,
  IonItem,
  IonButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import TopToolbar from '../components/TopToolbar';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { List as ListModel } from '../models/List';
import { add, cart } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import ChooseProductsModal from '../alerts/ChooseProductsModal';
import { Product } from '../models/Product';

function drawNoItems(addNewItem: (on: boolean) => void): ReactElement<ShoppingListProps, string> {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>No Items Assigned</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        You have no items assigned to this list. Please select some products to add to this list.
      </IonCardContent>
      <IonItem>
        <IonIcon icon={cart} slot="start"></IonIcon>
        <IonButton expand="block" onClick={() => addNewItem(true)}>
          Add a new item
        </IonButton>
      </IonItem>
    </IonCard>
  );
}

function drawNoList(): ReactElement<ShoppingListProps, string> {
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

type ShoppingListProps = {
  lists: List<Mapped<ListModel>>;
};
const ShoppingList: React.FC<ShoppingListProps> = (props) => {
  let { id } = useParams();
  const [addProductIsUp, setAddProductIsUp] = React.useState(false);
  const list = helpers.toList(props.lists.find((l) => l.get('id') == id));
  if (!list) return drawNoList();
  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setAddProductIsUp(true)} />
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

        {!list.items ? drawNoItems(setAddProductIsUp) : ''}
        <ChooseProductsModal
          isOpen={addProductIsUp}
          onClose={(selected: Map<Product, number>) => setAddProductIsUp(false)}
        />
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
