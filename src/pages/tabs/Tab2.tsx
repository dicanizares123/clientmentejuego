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

ChartJS.register(ArcElement, Tooltip, Legend);

const Tab2: React.FC = () => {
  const data = {
    labels: ["Logico", "Matematico"],
    datasets: [
      {
        data: [18, 7],
        backgroundColor: ["#445debff", "#56c447de"],
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        display: false, // Ocultar leyenda por defecto
      },
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

          {/* Gráfica sin tarjeta */}
          <div className="chart-content">
            <Doughnut data={data} options={options} />
          </div>

          {/* Tarjeta con labels debajo de la gráfica */}
          <IonCard>
            <IonCardContent>
              <div className="chart-labels">
                {data.labels.map((label, index) => (
                  <div key={index} className="label-item">
                    <div
                      className="label-color"
                      style={{
                        backgroundColor:
                          data.datasets[0].backgroundColor[index],
                      }}
                    />
                    <span className="label-text">{label}</span>
                    <span className="label-value">
                      {data.datasets[0].data[index]}
                    </span>
                  </div>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
