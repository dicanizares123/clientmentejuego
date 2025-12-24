import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import "./Tab3.css";
import { person } from "ionicons/icons";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <div className="icon-container">
            <IonIcon aria-hidden="true" icon={person} />
          </div>

          <IonCardHeader>
            <IonCardTitle>Nombre Ejemplo</IonCardTitle>

            <IonCardSubtitle>usuarioejemplo</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Usuario desde 01/01/2020</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
