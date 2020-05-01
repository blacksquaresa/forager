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
import { add, create } from 'ionicons/icons';
import NewVariantAlert from '../alerts/NewVariantAlert';
import { api } from '../App';
import { useParams } from 'react-router-dom';
import { Variant } from '../models/Variant';
import EditProductAlert from '../alerts/EditProductAlert';
import VariantItem from '../components/VariantItem';

function getProductDetails(
  id: number,
  updateProductState: (product: Product) => void,
  setFetchedDetails: (val: boolean) => void
): void {
  api.getProductDetails(id).then((product: Product) => {
    updateProductState(product);
    setFetchedDetails(true);
  });
}

function drawVariants(
  product: Product,
  variants: Variant[] | undefined,
  setCreateNewVariantAlertIsUp: (open: boolean) => void
): ReactNode {
  let result: JSX.Element[] = [];
  if (variants?.length) {
    variants.forEach((variant) => {
      result.push(<VariantItem key={variant.id} variant={variant} product={product} />);
    });
  } else {
    setCreateNewVariantAlertIsUp(true);
  }
  return result;
}

type ProductDetailProps = {
  products: List<Mapped<Product>>;
  updateProduct: (product: Product) => void;
};
const ProductDetail: React.FC<ProductDetailProps> = (props) => {
  let { id } = useParams();
  const [createNewVariantAlertIsUp, setCreateNewVariantAlertIsUp] = React.useState(false);
  const [updateProductIsUp, setUpdateProductIsUp] = React.useState(false);
  const [fetchedDetails, setFetchedDetails] = React.useState(false);
  React.useEffect(() => getProductDetails(Number(id), props.updateProduct, setFetchedDetails), []);

  if (!fetchedDetails) {
    return <IonLoading isOpen={!fetchedDetails} message={'Please wait...'} />;
  }

  const product = helpers.toProduct(props.products.find((p) => p.get('id') == id));

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
        {createNewVariantAlertIsUp ? (
          <NewVariantAlert product={product!} closeFunction={setCreateNewVariantAlertIsUp} />
        ) : (
          <IonList lines="full">{drawVariants(product!, product?.variants, setCreateNewVariantAlertIsUp)}</IonList>
        )}
      </IonContent>
      {updateProductIsUp ? <EditProductAlert product={product!} closeFunction={setUpdateProductIsUp} /> : ''}
    </IonPage>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    products: helpers.getProducts(state)
  };
};

export default connect(mapStateToProps, { updateProduct })(ProductDetail);
