export default interface IAnswer {
  answer: string;
  score: number;
}

export interface IAnswerList {
  category: 'string';
  answers: IAnswer[];
}
