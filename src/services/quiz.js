import { get, post } from "~/utils/request";

export const createQuizService = (data) => post("/quizzes/create-quiz", data);
export const getQuizzesService = () => get("/quizzes/quizzes");
export const getQuizService = (data) => post("/quizzes/get-quiz", data);
