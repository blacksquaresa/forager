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
  IonLoading,
  IonItem,
  IonButton
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { Product } from '../models/Product';
import TopToolbar from '../components/TopToolbar';
import { addProduct, updateProducts } from '../store/actions';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { add } from 'ionicons/icons';
import NewProductAlert from '../alerts/NewProductAlert';
import ProductList from '../components/ProductList';
import { api } from '../App';
import { checkForNewProducts } from '../services/Utils';

type ProductsProps = {
  products: List<Mapped<Product>>;
  addProduct: (product: Product) => void;
  updateProducts: (products: Product[]) => void;
};
const Products: React.FC<ProductsProps> = (props) => {
  const [createNewProductAlertIsUp, setCreateNewProductAlertIsUp] = React.useState(false);
  const [checkedForNewProducts, setCheckedForNewProducts] = React.useState(false);
  React.useEffect(() => checkForNewProducts(api, props.updateProducts, setCheckedForNewProducts), []);

  function drawProducts(productList: List<Mapped<Product>>): ReactElement<ProductsProps, string> | undefined {
    if (!checkedForNewProducts) {
      return;
    }

    return <ProductList products={helpers.toArray(productList)} createNewProduct={setCreateNewProductAlertIsUp} />;
  }

  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="top" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setCreateNewProductAlertIsUp(true)} />
          </IonFabButton>
        </IonFab>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Products</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Some copy describing what products are, and why you should care about them. Or maybe we don't need this?
            IDK.
          </IonCardContent>
        </IonCard>
        {drawProducts(props.products)}
      </IonContent>
      {createNewProductAlertIsUp ? <NewProductAlert closeFunction={setCreateNewProductAlertIsUp} /> : ''}
      <IonLoading isOpen={!checkedForNewProducts} message={'Please wait...'} />
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    products: helpers.getProducts(state)
  };
};

export default connect(mapStateToProps, { addProduct, updateProducts })(Products);
