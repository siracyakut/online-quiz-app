import { post } from "~/utils/request";

export const getTriviaQuestions = (difficulty, category, limit) =>
  fetch(
    `https://the-trivia-api.com/v2/questions?limit=${limit}&categories=${category}&difficulties=${difficulty}`,
  ).then((res) => res.json());

export const userPlacementService = (data) =>
  post("/solved-quizzes/placement", data);
export const leaderboardService = (data) =>
  post("/solved-quizzes/leaderboard", data);
