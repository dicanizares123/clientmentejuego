export interface GameScoreInterface {
  id: number;
  created_at: string;
  updated_at: string;
  finished_at: string;
  score: number;
  started_at: string;
  category_id: number;
  user_id: number;
}
