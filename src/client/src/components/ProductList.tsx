import React, { ReactNode, ReactElement } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonIcon,
  IonCardContent,
  IonButton,
  IonList
} from '@ionic/react';
import { cart } from 'ionicons/icons';
import { slug } from '../services/Utils';
import { Product } from '../models/Product';
import ProductItem from './ProductItem';

function drawNoProducts(props: ProductListProps): ReactElement<ProductListProps, string> {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>No Products Assigned</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        You have no products assigned to you. Please create a new product to add to your shopping lists.
      </IonCardContent>
      <IonItem>
        <IonIcon icon={cart} slot="start"></IonIcon>
        <IonButton expand="block" onClick={() => props.createNewProduct(true)}>
          Create a new product
        </IonButton>
      </IonItem>
    </IonCard>
  );
}

function drawProducts(products: Product[]): ReactNode {
  let result: JSX.Element[] = [];
  products.forEach((product) => {
    result.push(<ProductItem product={product} />);
  });
  return result;
}

type ProductListProps = {
  products?: Product[];
  createNewProduct: Function;
};
const ProductList: React.FC<ProductListProps> = (props) => {
  if (!props.products?.length) {
    return drawNoProducts(props);
  }

  return <IonList lines="full">{drawProducts(props.products)}</IonList>;
};

export default ProductList;
