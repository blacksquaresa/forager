import React, { ReactNode } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonIcon,
  IonFab,
  IonFabButton,
  IonLoading,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { connect } from 'react-redux';
import { DataContext } from '../models/DataContext';
import { Product } from '../models/Product';
import TopToolbar from '../components/TopToolbar';
import { updateProduct } from '../store/actions';
import helpers from '../store/helpers';
import { Mapped } from '../store/types';
import { List } from 'immutable';
import { add, pricetag, create } from 'ionicons/icons';
import NewProductAlert from '../alerts/NewProductAlert';
import { api } from '../App';
import { useParams } from 'react-router-dom';
import { Variant } from '../models/Variant';
import EditProductAlert from '../alerts/EditProductAlert';

function getProductDetails(
  id: number,
  updateProductState: (product: Product) => void,
  setFetchedDetails: (val: boolean) => void
): void {
  api.getProductDetails(id).then((product: Product) => {
    setFetchedDetails(true);
    updateProductState(product);
  });
}

function drawVariants(variants: Variant[] | undefined): ReactNode {
  let result: JSX.Element[] = [];
  if (variants) {
    variants.forEach((variant) => {
      result.push(
        <IonItem key={variant.id} detail>
          <IonIcon icon={pricetag} slot="start" />
          <IonLabel>
            <h2>{variant.name}</h2>
            <p>{variant.description}</p>
          </IonLabel>
        </IonItem>
      );
    });
  }
  return result;
}

type ProductDetailProps = {
  products: List<Mapped<Product>>;
  updateProduct: (product: Product) => void;
};
const ProductDetail: React.FC<ProductDetailProps> = (props) => {
  let { id } = useParams();
  const product = helpers.toProduct(props.products.find((p) => p.get('id') == id));
  const [createNewVariantAlertIsUp, setCreateNewVariantAlertIsUp] = React.useState(false);
  const [updateProductIsUp, setUpdateProductIsUp] = React.useState(false);
  const [fetchedDetails, setFetchedDetails] = React.useState(false);
  React.useEffect(() => getProductDetails(Number(id), props.updateProduct, setFetchedDetails), []);

  return (
    <IonPage>
      <TopToolbar />
      <IonContent>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} onClick={() => setCreateNewVariantAlertIsUp(true)} />
          </IonFabButton>
        </IonFab>
        <IonCard>
          <IonItem lines="none">
            <IonIcon icon={create} slot="end" onClick={() => setUpdateProductIsUp(true)} />
            <IonLabel>
              <h1>{product?.name}</h1>
              {product?.description ? <p>{product?.description}</p> : ''}
            </IonLabel>
          </IonItem>
        </IonCard>
        <IonList lines="full">{drawVariants(product?.variants)}</IonList>
      </IonContent>
      {updateProductIsUp ? <EditProductAlert product={product!} closeFunction={setUpdateProductIsUp} /> : ''}
      {createNewVariantAlertIsUp ? <NewProductAlert closeFunction={setCreateNewVariantAlertIsUp} /> : ''}
      <IonLoading isOpen={!fetchedDetails} message={'Please wait...'} />
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    products: helpers.getProducts(state)
  };
};

export default connect(mapStateToProps, { updateProduct })(ProductDetail);
