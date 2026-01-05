import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkmarkCircle, closeCircle, helpCircle } from "ionicons/icons";
import "./GameResults.css";
import { GameResultsInterface } from "../../interfaces/GameResultsInterface";

const GameResults: React.FC = () => {
  const history = useHistory();
  const [results, setResults] = useState<GameResultsInterface | null>(() => {
    // Inicializar directamente desde sessionStorage
    const storedResults = sessionStorage.getItem("gameResults");
    console.log("SessionStorage guardado:", storedResults);
    if (storedResults) {
      const parsed = JSON.parse(storedResults);
      sessionStorage.removeItem("gameResults");
      return parsed;
    }
    return null;
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  // Redirigir solo si no hay resultados
  useEffect(() => {
    if (!results && !sessionStorage.getItem("gameResults")) {
      setShouldRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      history.replace("/tabs/tab1");
    }
  }, [shouldRedirect, history]);

  const handleFinish = () => {
    history.replace("/tabs/tab1");
  };

  if (!results) {
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="results-container">
          <IonCard className="results-card">
            <IonCardContent>
              <div className="results-header">
                <h1 className="results-title">¡Juego Completado!</h1>
                <div className="score-circle">
                  <span className="score-number">{results.totalScore}</span>
                  <span className="score-label">Puntos</span>
                </div>
              </div>

              <div className="results-stats">
                <div className="stat-item correct">
                  <IonIcon icon={checkmarkCircle} />
                  <div className="stat-info">
                    <span className="stat-number">
                      {results.correctAnswers}
                    </span>
                    <span className="stat-label">Correctas</span>
                  </div>
                </div>

                <div className="stat-item incorrect">
                  <IonIcon icon={closeCircle} />
                  <div className="stat-info">
                    <span className="stat-number">
                      {results.incorrectAnswers}
                    </span>
                    <span className="stat-label">Incorrectas</span>
                  </div>
                </div>

                <div className="stat-item unanswered">
                  <IonIcon icon={helpCircle} />
                  <div className="stat-info">
                    <span className="stat-number">{results.unanswered}</span>
                    <span className="stat-label">Sin responder</span>
                  </div>
                </div>
              </div>

              <IonButton expand="block" size="large" onClick={handleFinish}>
                Finalizar
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default GameResults;
