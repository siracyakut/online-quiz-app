export const calculateTotalScore = (
  totalQuestions,
  userAnswers,
  maxTimePerQuestion,
) => {
  const maxScore = 100;
  const questionCountOptions = [10, 20, 30, 40, 50];

  if (!questionCountOptions.includes(totalQuestions)) {
    return null;
  }

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
