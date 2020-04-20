import React from 'react';
import { IonItem, IonAvatar } from '@ionic/react';
import { User } from '../models/User';

type AvatarProps = {
  member: User;
};
const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <IonItem key={props.member.id}>
      <IonAvatar>
        <img src={props.member.avatar} alt={props.member.name} />
      </IonAvatar>
    </IonItem>
  );
};

export default Avatar;
