import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonSpinner,
  useIonViewDidEnter,
} from "@ionic/react";
import "./Tab2.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import {
  fetchCategories,
  getScoresByCategories,
} from "../../services/ApiMenteJuegoService";
import { CategoryInterface } from "../../interfaces/CategoryInterface";
import { GameScoreInterface } from "../../interfaces/GameScoreInterface";

ChartJS.register(ArcElement, Tooltip, Legend);

const Tab2: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [scores, setScores] = useState<GameScoreInterface[]>([]);

  const loadScoresData = async () => {
    try {
      setLoading(true);
      console.log("Cargando datos de scores...");

      // Primero cargar las categorías
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);

      // Obtener los IDs de todas las categorías
      const categoryIds = categoriesData.map((cat) => cat.id);

      // Cargar los scores para todas las categorías (userId = 1 para desarrollo)
      const scoresData = await getScoresByCategories(1, categoryIds);
      setScores(scoresData);

      console.log("Scores cargados:", scoresData);
    } catch (error) {
      console.error("Error cargando scores:", error);
    } finally {
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    console.log("Tab2 - Cargando scores");
    loadScoresData();
  });

  // Preparar datos para la gráfica
  const getChartData = () => {
    // Crear un mapa de category_id a score
    const scoreMap = new Map<number, number>();
    scores.forEach((score) => {
      scoreMap.set(score.category_id, score.score);
    });

    // Filtrar solo categorías que tienen scores
    const categoriesWithScores = categories.filter((cat) =>
      scoreMap.has(cat.id)
    );

    const labels = categoriesWithScores.map((cat) => cat.title);
    const data = categoriesWithScores.map((cat) => scoreMap.get(cat.id) || 0);

    // Colores para las categorías
    const colors = ["#445debff", "#56c447de", "#ff6384", "#ffcd56", "#4bc0c0"];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors.slice(0, labels.length),
          borderColor: "transparent",
          borderWidth: 0,
        },
      ],
    };
  };

  const chartData = getChartData();

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: false,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCardContent>
          <div className="header-content">
            <IonCardTitle className="text-header">Resultados</IonCardTitle>
            <IonCardSubtitle>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Blanditiis sit eligendi quisquam magni minima.
              </p>
            </IonCardSubtitle>
          </div>

          {loading ? (
            <div className="loading-container">
              <IonSpinner name="crescent" />
            </div>
          ) : scores.length === 0 ? (
            <div className="no-data-container">
              <p>No hay resultados disponibles. ¡Juega algunas partidas!</p>
            </div>
          ) : (
            <>
              {/* Gráfica sin tarjeta */}
              <div className="chart-content">
                <Doughnut data={chartData} options={options} />
              </div>

              {/* Tarjeta con labels debajo de la gráfica */}
              <IonCard>
                <IonCardContent>
                  <div className="chart-labels">
                    {chartData.labels.map((label, index) => (
                      <div key={index} className="label-item">
                        <div
                          className="label-color"
                          style={{
                            backgroundColor:
                              chartData.datasets[0].backgroundColor[index],
                          }}
                        />
                        <span className="label-text">{label}</span>
                        <span className="label-value">
                          {chartData.datasets[0].data[index]} pts
                        </span>
                      </div>
                    ))}
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

export default Tab2;
