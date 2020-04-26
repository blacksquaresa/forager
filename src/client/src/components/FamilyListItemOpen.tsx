import React, { ReactNode } from 'react';
import { IonItem, IonIcon, IonLabel, IonList } from '@ionic/react';
import { Family } from '../models/Family';
import { personAdd, person, listCircle, list, addCircleOutline } from 'ionicons/icons';
import ThankYouAlert from '../alerts/ThankYouAlert';
import NewMemberAlert from '../alerts/NewMemberAlert';
import Avatar from './Avatar';
import NewListAlert from '../alerts/NewListAlert';

function drawLists(family: Family): ReactNode {
  let result: JSX.Element[] = [];
  family.lists?.forEach((list) => {
    result.push(
      <IonItem key={list.id} href={`/list/${list.id}`} detail>
        <IonIcon icon={listCircle} slot="start" />
        <IonLabel>{list.name}</IonLabel>
      </IonItem>
    );
  });
  return result;
}

function drawFamilyMembers(family: Family): ReactNode {
  let result: JSX.Element[] = [];
  family.members?.forEach((member) => {
    result.push(
      <IonItem key={member.id}>
        <Avatar member={member} slot="start" />
        <IonLabel>{member.name}</IonLabel>
      </IonItem>
    );
  });
  return result;
}

type FamilyListItemOpenProps = {
  family: Family;
  isSelected: boolean;
  key: string;
};
const FamilyListItemOpen: React.FC<FamilyListItemOpenProps> = (props) => {
  const [inviteNewMemberShowing, setinviteNewMemberShowing] = React.useState(false);
  const [AddNewListShowing, setAddNewListShowing] = React.useState(false);
  const [thankYouShowing, setthankYouShowing] = React.useState<string | false>(false);
  return (
    <div>
      <IonList>
        <IonItem>
          <IonIcon icon={person} slot="start" />
          <IonLabel>Members ({props.family.members?.length || 0})</IonLabel>
          <IonIcon icon={personAdd} slot="end" title="Add new member" onClick={() => setinviteNewMemberShowing(true)} />
        </IonItem>
        {drawFamilyMembers(props.family)}
      </IonList>

      <IonList>
        <IonItem>
          <IonIcon icon={list} slot="start" />
          <IonLabel>Lists ({props.family.lists?.length || 0})</IonLabel>
          <IonIcon icon={addCircleOutline} slot="end" title="Add new list" onClick={() => setAddNewListShowing(true)} />
        </IonItem>
        {drawLists(props.family)}
      </IonList>

      <NewMemberAlert
        isOpen={inviteNewMemberShowing}
        familyId={props.family.id}
        successFunction={() => {
          setthankYouShowing(
            'Thank you for your invitation. It has been registered, and your invitee will receive it the next time they log in.'
          );
          setinviteNewMemberShowing(false);
        }}
        closeFunction={() => setinviteNewMemberShowing(false)}
      />
      <NewListAlert
        isOpen={AddNewListShowing}
        family={props.family}
        successFunction={() => {
          setAddNewListShowing(false);
        }}
        closeFunction={() => setAddNewListShowing(false)}
      />
      <ThankYouAlert isOpen={!!thankYouShowing} onClose={() => setthankYouShowing(false)} message={thankYouShowing} />
    </div>
  );
};

export default FamilyListItemOpen;
