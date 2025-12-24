import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  useIonViewDidEnter,
  IonSpinner,
  IonCard,
} from "@ionic/react";
import "./Tab1.css";
import { book, calculator, bulb, chevronForward } from "ionicons/icons";
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
      title: "Simulador Universitario",
      description:
        "Prepárate para los exámenes de admisión universitaria con preguntas similares a las que encontrarás en el examen real.",
      short_description: "Prepárate para los exámenes de admisión",
      slug: "universitario",
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

  // Mapa de iconos por slug
  const categoryIcons: { [key: string]: string } = {
    universitario: book,
    matematico: calculator,
    logico: bulb,
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
            <div className="categories-container">
              {categories.map((category) => (
                <IonCard
                  key={category.id}
                  className="category-card-item"
                  onClick={() => handleCatogoryClick(category)}
                >
                  <div className="card-content-row">
                    <div className="icon-circle">
                      <IonIcon
                        icon={categoryIcons[category.slug]}
                        style={{
                          fontSize: "32px",
                          color: "var(--ion-color-primary)",
                        }}
                      />
                    </div>
                    <div className="card-text">
                      <h3 className="card-title">{category.title}</h3>
                      <p className="card-description">{category.description}</p>
                    </div>
                    <IonIcon
                      icon={chevronForward}
                      className="arrow-icon"
                      style={{
                        fontSize: "24px",
                        color: "var(--ion-color-medium)",
                      }}
                    />
                  </div>
                </IonCard>
              ))}
            </div>
          )}
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
