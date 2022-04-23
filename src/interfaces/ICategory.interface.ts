import IAnswer from './IAnswer.interface';

export default interface ICategory {
  id?: number;
  category: string;
  answers: IAnswer[];
}
