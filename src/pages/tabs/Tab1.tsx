import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonListHeader,
  IonIcon,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  useIonViewDidEnter,
  IonSpinner,
} from "@ionic/react";
import "./Tab1.css";
import { playCircle } from "ionicons/icons";
import { useHistory } from "react-router";
import { CategoryInterface } from "../../interfaces/CategoryInterface";
import { useState } from "react";
const Tab1: React.FC = () => {
  const history = useHistory();

  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Datos de prueba (simula una llamada a API)
  const mockCategories: CategoryInterface[] = [
    {
      id: 1,
      title: "Simulador Universitarios",
      description:
        "Prepárate para los exámenes de admisión universitaria con preguntas similares a las que encontrarás en el examen real.",
      short_description: "Prepárate para los exámenes de admisión",
      slug: "universitarios",
      duration: 20,
      questions_per_game: 10,
    },
    {
      id: 2,
      title: "Razonamiento Matemático",
      description:
        "Desarrolla tus habilidades matemáticas con problemas de lógica, aritmética, álgebra y geometría.",
      short_description: "Desarrolla tus habilidades matemáticas",
      slug: "matematico",
      duration: 20,
      questions_per_game: 10,
    },
    {
      id: 3,
      title: "Razonamiento Lógico",
      description:
        "Mejora tu capacidad de análisis con ejercicios de secuencias, analogías y problemas de lógica.",
      short_description: "Mejora tu capacidad de análisis",
      slug: "logico",
      duration: 20,
      questions_per_game: 10,
    },
  ];
  const fetchCategories = async () => {
    try {
      setLoading(true);

      // TODO: Reemplazar con la llamada real a la API en ApiMenteJuegoService.ts
      // const response = await fetch('https://tu-api.com/categories');
      // const data = await response.json();
      // setCategories(data);

      // Por ahora usamos datos de prueba
      setTimeout(() => {
        setCategories(mockCategories);
        setLoading(false);
      }, 500); // Simula delay de red
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useIonViewDidEnter(() => {
    console.log("Leyendo Categorias");
    fetchCategories();
  });

  const handleCatogoryClick = (category: CategoryInterface) => {
    history.push(`/category/${category.slug}`, {
      id: category.id,
      title: category.title,
      description: category.description,
      short_description: category.short_description,
      duration: category.duration,
      questions_per_game: category.questions_per_game,
      slug: category.slug,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCardContent>
          <div className="header-content">
            <IonCardTitle className="text-header">
              Empieza a practicar tu dominio
            </IonCardTitle>
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
          ) : (
            <IonList>
              <IonListHeader>
                <IonLabel>Categorias </IonLabel>
              </IonListHeader>
              {categories.map((category) => (
                <IonItem key={category.id}>
                  <IonLabel>
                    {category.title}
                    <p className="description-category">
                      {category.description}
                    </p>
                  </IonLabel>
                  <IonIcon
                    className="ion-icon-play"
                    icon={playCircle}
                    onClick={() => handleCatogoryClick(category)}
                  />
                </IonItem>
              ))}
            </IonList>
          )}
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
