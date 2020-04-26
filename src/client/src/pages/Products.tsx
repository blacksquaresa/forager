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
  IonFabButton,
  IonLoading
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

function checkForNewProducts(
  updateProductState: (products: Product[]) => void,
  setCheckedForNewProducts: (val: boolean) => void
): void {
  api.getProducts().then((products: Product[]) => {
    setCheckedForNewProducts(true);
    updateProductState(products);
  });
}

type ProductsProps = {
  products: List<Mapped<Product>>;
  addProduct: (product: Product) => void;
  updateProducts: (products: Product[]) => void;
};
const Products: React.FC<ProductsProps> = (props) => {
  const [createNewProductAlertIsUp, setCreateNewProductAlertIsUp] = React.useState(false);
  const [checkedForNewProducts, setCheckedForNewProducts] = React.useState(false);
  React.useEffect(() => checkForNewProducts(props.updateProducts, setCheckedForNewProducts), []);

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
        <ProductList products={helpers.toArray(props.products)} createNewProduct={setCreateNewProductAlertIsUp} />
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
