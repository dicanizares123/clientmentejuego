export interface AnswerInterface {
  question_id: number;
  selected_option_id: number;
}

export interface SubmitAnswersInterface {
  game_id: number;
  answers: AnswerInterface[];
}
