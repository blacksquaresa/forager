import React, { ReactNode, ReactElement } from 'react';
import {
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonButton
} from '@ionic/react';
import { Product } from '../models/Product';
import ProductItem from './ProductItem';
import { cart } from 'ionicons/icons';

function drawNoProducts(createNewProduct: (on: boolean) => void): ReactElement<ProductListProps, string> {
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
        <IonButton expand="block" onClick={() => createNewProduct(true)}>
          Create a new product
        </IonButton>
      </IonItem>
    </IonCard>
  );
}

function drawProducts(products: Product[]): ReactNode {
  let result: JSX.Element[] = [];
  products.forEach((product) => {
    result.push(<ProductItem product={product} key={product.id} />);
  });
  return result;
}

type ProductListProps = {
  products?: Product[];
  createNewProduct: (on: boolean) => void;
};
const ProductList: React.FC<ProductListProps> = (props) => {
  if (!props.products?.length) {
    return drawNoProducts(props.createNewProduct);
  }
  return <IonList lines="full">{drawProducts(props.products)}</IonList>;
};

export default ProductList;
