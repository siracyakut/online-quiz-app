import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 30,
  data: [],
  currentQuestion: 0,
  score: 0,
  userAnswers: [],
  clicked: false,
};

const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    _setTime: (state, action) => {
      if (!state.clicked) {
        state.time = action.payload;
      }
    },
    _setData: (state, action) => {
      state.data = action.payload;
    },
    _setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    _incrementCurrentQuestion: (state) => {
      state.currentQuestion++;
    },
    _setScore: (state, action) => {
      state.score = action.payload;
    },
    _addUserAnswer: (state, action) => {
      state.userAnswers = [...state.userAnswers, action.payload];
    },
    _setClicked: (state, action) => {
      state.clicked = action.payload;
    },
    _setUserAnswers: (state, action) => {
      state.userAnswers = action.payload;
    },
  },
});

export const {
  _setTime,
  _incrementCurrentQuestion,
  _setData,
  _setScore,
  _addUserAnswer,
  _setClicked,
  _setCurrentQuestion,
  _setUserAnswers,
} = game.actions;
export default game.reducer;
