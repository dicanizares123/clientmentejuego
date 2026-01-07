export interface QuestionsResponse {
  question_id: number;
  question: string;
  category_id: number;
  options: Option[];
}

export interface Option {
  question_option_id: number;
  possible_answer: string;
}
