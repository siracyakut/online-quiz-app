export const getTriviaQuestions = (difficulty, category, limit) =>
  fetch(
    `https://the-trivia-api.com/v2/questions?limit=${limit}&categories=${category}&difficulties=${difficulty}`,
  ).then((res) => res.json());
