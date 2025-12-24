import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import "./Tab3.css";
import { person } from "ionicons/icons";
import { UserInterface } from "../../interfaces/UserInterface";

const Tab3: React.FC = () => {
  const mockUser: UserInterface = {
    id: 1,
    name: "Mauricio Galarza",
    username: "mauro22",
    email: "mau@email.com",
    created_at: "01/01/2020",
  };

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

        <IonCardContent>
          {/* Icono en contenedor ovalado fuera de tarjeta */}
          <div className="profile-icon-container">
            <div className="icon-oval">
              <IonIcon
                icon={person}
                style={{ fontSize: "80px", color: "var(--ion-color-primary)" }}
              />
            </div>
          </div>

          {/* Tarjeta con información del usuario */}
          <IonCard>
            <IonCardContent>
              <div className="user-info">
                <div className="info-row">
                  <span className="info-label">Nombre</span>
                  <span className="info-value">{mockUser.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Usuario</span>
                  <span className="info-value">{mockUser.username}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{mockUser.email}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Miembro desde</span>
                  <span className="info-value">{mockUser.created_at}</span>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
