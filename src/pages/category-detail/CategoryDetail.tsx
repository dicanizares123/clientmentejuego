import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { school } from "ionicons/icons";
import "./CategoryDetail.css";
import { CategoryInterface } from "../../interfaces/CategoryInterface";

const CategoryDetail: React.FC = () => {
  const history = useHistory();
  const location = useLocation<CategoryInterface>();

  const category = location.state;

  // Si no hay datos, redirige al tab1
  useEffect(() => {
    if (!category) {
      history.replace("/tabs/tab1");
    }
  }, [category, history]);

  const handleStart = () => {
    // Redirige a donde necesites, ejemplo: página de juego
    // history.push(`/game/${category.slug}`);
    // O por ahora vuelve al tab1
    history.push("/tabs/tab1");
  };

  // Mientras verifica o si no hay datos, muestra un spinner
  if (!category) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }
  console.log(category);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tab1" />
          </IonButtons>
          <IonTitle>{category.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="category-card">
          <strong>
            <p className="shortcategory-description">
              {category.short_description}
            </p>
          </strong>
          <div className="icon-container">
            <IonIcon
              icon={school}
              style={{ fontSize: "80px", color: "var(--ion-color-primary)" }}
            />
          </div>
          <IonCardContent>
            <div className="category-info">
              <div className="info-item">
                <strong>Duración:</strong> {category.duration} minutos
              </div>
              <div className="info-item">
                <strong>Preguntas:</strong> {category.questions_per_game}{" "}
                preguntas
              </div>
            </div>

            <IonButton expand="full" size="default" onClick={handleStart}>
              Listo
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CategoryDetail;
