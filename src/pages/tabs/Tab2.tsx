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
        backgroundColor: ["#445debff", "#ecececde"],
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
        position: "top",
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
          <IonCard>
            <IonCardContent>
              <div className="chart-content">
                <Doughnut data={data} options={options} />
              </div>
            </IonCardContent>
          </IonCard>
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
