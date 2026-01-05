import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonIcon,
  useIonViewDidEnter,
  IonSpinner,
} from "@ionic/react";
import "./Tab3.css";
import { person } from "ionicons/icons";
import { UserInterface } from "../../interfaces/UserInterface";
import { useState } from "react";
import { getUserInfo } from "../../services/ApiMenteJuegoService";

const Tab3: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const [userInfo, setUserInfo] = useState<UserInterface>({
    id: null,
    firstName: "Nombre no encontrado",
    lastName: null,
    email: "Email no encontrado",
    username: "Usuario no encontrado",
    created_at: "No se encontro",
  });

  const loadUserInfo = async () => {
    const response = await getUserInfo();

    if (response) {
      setUserInfo(response);
    }
    setLoading(false);
  };

  useIonViewDidEnter(() => {
    console.log("Leyendo usuario");
    loadUserInfo();
  });

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
          {loading ? (
            <div className="loading-container">
              <IonSpinner name="crescent" />
            </div>
          ) : (
            <>
              {/* Icono en contenedor ovalado fuera de tarjeta */}
              <div className="profile-icon-container">
                <div className="icon-oval">
                  <IonIcon
                    icon={person}
                    style={{
                      fontSize: "80px",
                      color: "var(--ion-color-primary)",
                    }}
                  />
                </div>
              </div>

              {/* Tarjeta con información del usuario */}
              <IonCard>
                <IonCardContent>
                  <div className="user-info">
                    <div className="info-row">
                      <span className="info-label">Nombre</span>
                      <span className="info-value">
                        {userInfo.firstName} {userInfo.lastName}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Usuario</span>
                      <span className="info-value">{userInfo.username}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email</span>
                      <span className="info-value">{userInfo.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Miembro desde</span>
                      <span className="info-value">
                        {new Date(userInfo.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </>
          )}
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
