import React, { ReactNode, ReactElement } from 'react';
import {
  IonAlert,
  IonModal,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonLoading
} from '@ionic/react';
import { addProduct, updateProducts } from '../store/actions';
import { api } from '../App';
import { connect } from 'react-redux';
import { Product } from '../models/Product';
import ProductItem from '../components/ProductItem';
import { Mapped } from '../store/types';
import { DataContext } from '../models/DataContext';
import helpers from '../store/helpers';
import { List } from 'immutable';
import { checkForNewProducts } from '../services/Utils';
import ProductSelector from '../components/ProductSelector';

function drawNoProducts(): ReactElement<ChooseProductsModalProps, string> {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>No Products Available</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        You have no products more products available for selection. Go to the products section to add more.
      </IonCardContent>
    </IonCard>
  );
}

type ChooseProductsModalProps = {
  isOpen?: boolean;
  products: List<Mapped<Product>>;
  onClose: (products: Map<Product, number>) => void;
  addProduct: (product: Product) => void;
  updateProducts: (products: Product[]) => void;
};
const ChooseProductsModal: React.FC<ChooseProductsModalProps> = (props) => {
  const [checkedForNewProducts, setCheckedForNewProducts] = React.useState(false);
  React.useEffect(() => checkForNewProducts(api, props.updateProducts, setCheckedForNewProducts), []);
  if (!props.isOpen) {
    return null;
  }
  const products = helpers.toArray(props.products);
  const map = new Map<Product, number>();

  function drawProducts(products?: Product[]): ReactNode {
    if (!checkedForNewProducts) {
      return <IonLoading isOpen={!checkedForNewProducts} message={'Please wait...'} />;
    }

    if (!products?.length) {
      return drawNoProducts();
    }

    let result: JSX.Element[] = [];
    products.forEach((product) => {
      result.push(
        <ProductSelector
          product={product}
          key={product.id}
          onChange={(val: number) => {
            map.set(product, val);
          }}
        />
      );
    });
    return result;
  }

  return (
    <IonModal isOpen={true}>
      <IonCard>
        <IonCardContent>
          <p>
            Select which products from this list you'd like to add to your shopping list, and click Done when you're
            finished.
          </p>
          <IonButton expand="block" onClick={() => props.onClose(map)}>
            Done
          </IonButton>
        </IonCardContent>
      </IonCard>
      <IonList lines="full">{drawProducts(products)}</IonList>
    </IonModal>
  );
};

const mapStateToProps = (state: Mapped<DataContext>) => {
  return {
    products: helpers.getProducts(state)
  };
};

export default connect(mapStateToProps, { addProduct, updateProducts })(ChooseProductsModal);
