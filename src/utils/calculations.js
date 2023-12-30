export const calculateTotalScore = (
  totalQuestions,
  userAnswers,
  maxTimePerQuestion,
) => {
  const maxScore = 100;
  let totalScore = 0;

  userAnswers.forEach((answer) => {
    if (answer.time > maxTimePerQuestion || answer.result !== true) {
      return null;
    }

    const maxQuestionScore = maxScore / totalQuestions;
    const timeRatio = 1 - answer.time / maxTimePerQuestion;
    const questionScore = maxQuestionScore * timeRatio;

    totalScore += questionScore;
  });

  return totalScore;
};
