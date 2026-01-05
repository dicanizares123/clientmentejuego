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
import {
  book,
  calculator,
  bulb,
  /*   chevronForward,
   */ playCircle,
} from "ionicons/icons";
import { useHistory } from "react-router";
import { CategoryInterface } from "../../interfaces/CategoryInterface";
import { useState } from "react";
import { fetchCategories } from "../../services/ApiMenteJuegoService";
const Tab1: React.FC = () => {
  const history = useHistory();

  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadCategories = async () => {
    setLoading(true);

    const categoriesData = await fetchCategories();
    setCategories(categoriesData);
    setLoading(false);

    // TODO: Reemplazar con la llamada real a la API en ApiMenteJuegoService.ts
    // const response = await fetch('https://tu-api.com/categories');
    // const data = await response.json();
    // setCategories(data);

    // Por ahora usamos datos de prueba
  };

  useIonViewDidEnter(() => {
    console.log("Leyendo Categorias");
    loadCategories();
  });

  const handleCatogoryClick = (category: CategoryInterface) => {
    history.push(`/category/${category.slug}`, {
      id: category.id,
      title: category.title,
      description: category.description,
      short_description: category.short_description,
      duration_in_minutes: category.duration_in_minutes,
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

  // Diccionario de agrupación de categorías
  const categoryGroups: { [key: string]: string[] } = {
    simuladores: ["universitario"],
    habilidades: ["matematico", "logico"],
  };

  // Función para filtrar categorías por grupo
  const getCategoriesByGroup = (groupSlugs: string[]) => {
    return categories.filter((cat) => groupSlugs.includes(cat.slug));
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
            <>
              {/* Sección Simuladores */}
              <div className="section-container">
                <IonCardTitle className="section-title">
                  Simuladores
                </IonCardTitle>
                <IonCardSubtitle className="section-subtitle">
                  Simuladores que te preparan para exámenes
                </IonCardSubtitle>
                <div className="categories-container">
                  {getCategoriesByGroup(categoryGroups.simuladores).map(
                    (category) => (
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
                            <p className="card-description">
                              {category.description}
                            </p>
                          </div>
                          <IonIcon
                            icon={playCircle}
                            className="arrow-icon"
                            style={{
                              fontSize: "24px",
                              color: "var(--ion-color-primary",
                            }}
                          />
                        </div>
                      </IonCard>
                    )
                  )}
                </div>
              </div>

              {/* Sección Desarrollo de Habilidades Cognitivas */}
              <div className="section-container">
                <IonCardTitle className="section-title">
                  Desarrollo de Habilidades Cognitivas
                </IonCardTitle>
                <IonCardSubtitle className="section-subtitle">
                  Mejora tu razonamiento lógico y matemático
                </IonCardSubtitle>
                <div className="categories-container">
                  {getCategoriesByGroup(categoryGroups.habilidades).map(
                    (category) => (
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
                            <p className="card-description">
                              {category.description}
                            </p>
                          </div>
                          <IonIcon
                            icon={playCircle}
                            className="arrow-icon"
                            style={{
                              fontSize: "24px",
                              color: "var(--ion-color-primary",
                            }}
                          />
                        </div>
                      </IonCard>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </IonCardContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
