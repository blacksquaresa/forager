import React from 'react';
import {
  IonItem,
  IonIcon,
  IonLabel,
  IonBadge,
  IonCheckbox,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItemGroup
} from '@ionic/react';
import { caretDown, remove, add, trash, refresh } from 'ionicons/icons';
import { ListItem } from '../models/ListItem';
import Conditional from './Conditional';

type ShoppingListItemProps = {
  item: ListItem;
  isOpen?: boolean;
  onChange: (change: number) => void;
  onRemove: () => void;
};
const ShoppingListItem: React.FC<ShoppingListItemProps> = (props) => {
  const [quantity, setQuantity] = React.useState(props.item.quantity || 0);
  const [isOpen, setIsOpen] = React.useState(props.isOpen);
  const color = quantity ? '' : 'success';
  const badgeColor = quantity ? '' : 'medium';

  function drawVariations() {}

  return (
    <IonItemGroup>
      <IonItemSliding>
        <IonItemOptions side="start">
          <IonItemOption onClick={() => setQuantity(props.item.quantity)}>
            <IonIcon icon={refresh} />
          </IonItemOption>
          <IonItemOption color="danger" onClick={() => props.onRemove()}>
            <IonIcon icon={trash} />
          </IonItemOption>
        </IonItemOptions>

        <IonItem color={color} key={props.item.id}>
          <IonCheckbox
            color="primary"
            slot="start"
            checked={!quantity}
            onClick={() => setQuantity(quantity ? 0 : props.item.quantity)}
          />
          <IonLabel>
            <h2>
              {props.item.name} ({props.item.units}s)
            </h2>
            <p>{props.item.description}</p>
          </IonLabel>
          <IonBadge color={badgeColor}>{quantity || 0}</IonBadge>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption
            onClick={(e) => {
              setQuantity(quantity === 0 ? props.item.quantity : quantity - 1);
              e.stopPropagation();
            }}
          >
            <IonIcon icon={remove} slot="end" />
          </IonItemOption>
          <IonItemOption
            onClick={(e) => {
              setQuantity(quantity === props.item.quantity ? 0 : quantity + 1);
              e.stopPropagation();
            }}
          >
            <IonIcon icon={add} slot="end" />
          </IonItemOption>
          <IonItemOption
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IonIcon icon={caretDown} />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    </IonItemGroup>
  );
};

export default ShoppingListItem;
