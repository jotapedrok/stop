import { createSlice } from '@reduxjs/toolkit';

interface IAnswerTurn {
  category: string;
  answer: string;
  score: number;
}

interface ITurns {
  turn: number;
  answers: IAnswerTurn[];
}

const initalActualTurn: ITurns = {
  turn: 1,
  answers: [],
};

const initalTurns: ITurns[] = [];

const turn = createSlice({
  name: 'turn',

  initialState: {
    turnType: 'default',
    actualTurn: initalActualTurn,
    turns: initalTurns,
  },

  reducers: {
    setStop(state) {
      state.turnType = 'stop';
    },

    setDefault(state) {
      state.turnType = 'default';
    },

    setSum(state) {
      state.turnType = 'sum';
    },

    sendActualRespost(state, { payload }) {
      const found = state.actualTurn.answers.find(
        answer => answer.category === payload.category,
      );
      if (found) {
        const i = state.actualTurn.answers.indexOf(found);
        state.actualTurn.answers[i].answer = payload.answer;
        state.actualTurn.answers[i].score = payload.score;
      } else {
        state.actualTurn.answers.push({
          category: payload.category,
          answer: payload.answer,
          score: payload.score,
        });
      }
    },

    sendTurnResposts(state) {
      state.turns.push(state.actualTurn);
      state.actualTurn = { turn: state.actualTurn.turn + 1, answers: [] };
    },

    onReset(state) {
      state.actualTurn = initalActualTurn;
      state.turnType = 'default';
      state.turns = initalTurns;
    },
  },
});

export default turn.reducer;
export const {
  setStop,
  setDefault,
  setSum,
  sendActualRespost,
  sendTurnResposts,
  onReset,
} = turn.actions;
export type { IAnswerTurn, ITurns };
