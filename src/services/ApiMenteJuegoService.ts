import { CategoryInterface } from "../interfaces/CategoryInterface";
import axios from "axios";
import { UserInterface } from "../interfaces/UserInterface";
import { QuestionsResponse } from "../interfaces/QuestionsResponse";
import { StartGameInterface } from "../interfaces/StartGameInterface";
import { SubmitAnswersInterface } from "../interfaces/SubmitAnswersInterface";
import { GameResultsInterface } from "../interfaces/GameResultsInterface";
import { GameScoreInterface } from "../interfaces/GameScoreInterface";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080" // Para navegador web
    : "http://10.0.2.2:8080"; // Para emulador Android

/**
 * Recupera las categorías de la API.
 * @return Una promesa que resuelve con un array de categorías.
 */

export const fetchCategories = async (): Promise<CategoryInterface[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);

    const categories: CategoryInterface[] = response.data;
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getUserInfo = async (): Promise<UserInterface> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/1`);

    const userInfo: UserInterface = response.data;
    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const getQuestionWithOptions = async (
  categoryId: number
): Promise<QuestionsResponse[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/question-options/with-options/${categoryId}`
    );

    const questionsWithOptions: QuestionsResponse[] = response.data;
    return questionsWithOptions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const startGame = async (startGameRequest: StartGameInterface) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/games/start`,
      startGameRequest
    );
    console.log("Juego iniciado con exito");

    return response.data;
  } catch (error) {
    console.error("Error starting game:", error);
    throw error;
  }
};

export const submitAnswers = async (
  submitRequest: SubmitAnswersInterface
): Promise<GameResultsInterface> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/games/submit`,
      submitRequest
    );
    console.log("Respuestas enviadas con éxito");

    console.log("Response data:", response.data); // Agregar este log para depuración
    return response.data;
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw error;
  }
};

export const getScoresByCategories = async (
  userId: number,
  categoryIds: number[]
): Promise<GameScoreInterface[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/games/scores`, {
      params: {
        userId,
        categoryIds: categoryIds.join(","),
      },
    });
    console.log("Scores obtenidos con éxito");

    return response.data;
  } catch (error) {
    console.error("Error fetching scores:", error);
    throw error;
  }
};
