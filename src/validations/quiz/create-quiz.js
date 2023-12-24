import Yup from "~/validations/yup";

export const createQuizSchema = Yup.object().shape({
  quizName: Yup.string().min(3).max(32).required(),
  quizCategory: Yup.string().min(3).max(32).required(),
  quizDiff: Yup.string()
    .oneOf(["easy", "medium", "hard"], "Incorrect choice")
    .required(),
});
