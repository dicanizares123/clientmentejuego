import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  IonProgressBar,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Game.css";
import {
  getQuestionWithOptions,
  startGame,
  submitAnswers,
} from "../../services/ApiMenteJuegoService";
import { QuestionsResponse } from "../../interfaces/QuestionsResponse";
import { StartGameInterface } from "../../interfaces/StartGameInterface";
import { SubmitAnswersInterface } from "../../interfaces/SubmitAnswersInterface";

interface GameState {
  categoryId: number;
  categoryTitle: string;
}

const Game: React.FC = () => {
  const history = useHistory();
  const location = useLocation<GameState>();

  const [questions, setQuestions] = useState<QuestionsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});
  const [gameId, setGameId] = useState<number | null>(null);

  const { categoryId, categoryTitle } = location.state || {};

  useEffect(() => {
    if (!categoryId) {
      history.replace("/tabs/tab1");
      return;
    }

    const loadGameData = async () => {
      try {
        setLoading(true);
        // Resetear estados del juego anterior
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setGameId(null);

        // Iniciar el juego primero
        const startGameRequest: StartGameInterface = {
          category_id: categoryId,
          user_id: 1, // ID de usuario fijo para desarrollo
        };

        const gameResponse = await startGame(startGameRequest);
        setGameId(gameResponse.id);

        // Luego cargar las preguntas
        const questionsData = await getQuestionWithOptions(categoryId);
        setQuestions(questionsData);
      } catch (error) {
        console.error("Error loading game data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, [categoryId, history]);

  const handleAnswerChange = (questionId: number, optionId: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = async () => {
    if (!gameId) {
      console.error("No game ID available");
      return;
    }

    if (submitting) {
      return; // Evitar múltiples submissions
    }

    try {
      setSubmitting(true);

      // Construir el array de respuestas
      const answers = Object.entries(selectedAnswers).map(
        ([question_id, selected_option_id]) => ({
          question_id: parseInt(question_id),
          selected_option_id,
        })
      );

      const submitRequest: SubmitAnswersInterface = {
        game_id: gameId,
        answers,
      };

      console.log("Enviando respuestas:", submitRequest);

      // Enviar las respuestas
      const results = await submitAnswers(submitRequest);

      console.log("Resultados recibidos:", results);

      // Guardar resultados en sessionStorage para la página de resultados
      sessionStorage.setItem("gameResults", JSON.stringify(results));

      // Navegar a la página de resultados usando window.location
      window.location.href = "/game-results";
      console.log(
        "SessionStorage guardado:",
        sessionStorage.getItem("gameResults")
      );
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <div className="loading-container">
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (questions.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/tab1" />
            </IonButtons>
            <IonTitle>Juego</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No hay preguntas disponibles para esta categoría.</p>
        </IonContent>
      </IonPage>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / questions.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/tab1" />
          </IonButtons>
          <IonTitle>{categoryTitle || "Juego"}</IonTitle>
        </IonToolbar>
        <IonProgressBar value={progress} />
      </IonHeader>
      <IonContent fullscreen>
        <div className="game-container">
          <div className="question-header">
            <h2 className="question-number">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </h2>
          </div>

          <IonCard key={currentQuestion.question_id} className="question-card">
            <IonCardContent>
              <h3 className="question-text">{currentQuestion.question}</h3>

              <IonRadioGroup
                key={`radio-group-${currentQuestion.question_id}`}
                value={selectedAnswers[currentQuestion.question_id]}
                onIonChange={(e) =>
                  handleAnswerChange(
                    currentQuestion.question_id,
                    e.detail.value
                  )
                }
              >
                {currentQuestion.options.map((option) => (
                  <div key={option.question_option_id} className="option-item">
                    <IonRadio value={option.question_option_id} />
                    <IonLabel>{option.possible_answer}</IonLabel>
                  </div>
                ))}
              </IonRadioGroup>
            </IonCardContent>
          </IonCard>

          <div className="navigation-buttons">
            <IonButton
              expand="block"
              fill="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </IonButton>

            {currentQuestionIndex === questions.length - 1 ? (
              <IonButton
                expand="block"
                onClick={handleFinish}
                disabled={submitting}
              >
                {submitting ? "Enviando..." : "Finalizar"}
              </IonButton>
            ) : (
              <IonButton expand="block" onClick={handleNext}>
                Siguiente
              </IonButton>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
