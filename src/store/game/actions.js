import store from "~/store";
import {
  _setScore,
  _addUserAnswer,
  _incrementCurrentQuestion,
  _setData,
  _setTime,
  _setClicked,
  _setCurrentQuestion,
  _setUserAnswers,
} from "~/store/game";

export const setTime = (data) => store.dispatch(_setTime(data));
export const setData = (data) => store.dispatch(_setData(data));
export const incrementCurrentQuestion = () =>
  store.dispatch(_incrementCurrentQuestion());
export const setCurrentQuestion = (data) =>
  store.dispatch(_setCurrentQuestion(data));
export const setScore = (data) => store.dispatch(_setScore(data));
export const addUserAnswer = (time, result) =>
  store.dispatch(_addUserAnswer({ time, result }));
export const setClicked = (data) => store.dispatch(_setClicked(data));
export const setUserAnswers = (data) => store.dispatch(_setUserAnswers(data));
