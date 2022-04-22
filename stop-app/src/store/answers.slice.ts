import { createSlice } from '@reduxjs/toolkit';
import { IAnswerList } from '../interfaces/IAnswer.interface';

const initialAnswersArray: IAnswerList[] = [];

const answers = createSlice({
  name: 'answers',

  initialState: {
    answers: initialAnswersArray,
  },

  reducers: {
    setAnswers(state, { payload }) {
      const category = state.answers.find(
        answerList => answerList.category === payload.category,
      );
      if (category) {
        const i = state.answers.indexOf(category);
        state.answers[i].answers = payload.answers;
      } else {
        state.answers.push(payload);
      }
    },
  },
});

export default answers.reducer;
export const { setAnswers } = answers.actions;
