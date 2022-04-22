import React, { ChangeEvent, useState, useEffect } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import IAnswer from '../../interfaces/IAnswer.interface';
import ICategory from '../../interfaces/ICategory.interface';
import { RootState } from '../../store';
import { setAnswers } from '../../store/answers.slice';

interface CategoryProps {
  category: ICategory;
}

const answerListType: IAnswer[] = [];

export default function Category(props: CategoryProps) {
  const [state, setState] = useState({
    answerList: answerListType,
    answerInput: '',
    answerBeforePoints: '',
    setedPoints: 0,
  });

  const { category } = props;

  const dispatch = useDispatch();

  const turn = useSelector((s: RootState) => s.turn.turn);

  useEffect(() => {
    if (turn === 'stop') {
      setState({
        ...state,
        answerBeforePoints: answerInput,
        answerInput: '',
      });
    }
    if (turn === 'sum') {
      setState({
        ...state,
        answerList: [...answerList, { answer: answerBeforePoints, score: setedPoints }],
        answerBeforePoints: '',
        setedPoints: 0,
      });
      dispatch(setAnswers({ category, answers: answerList }));
    }
  }, [turn]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const { answerList, answerInput, answerBeforePoints, setedPoints } = state;
  return (
    <div className="category">
      <div className="category-title">
        <h4>{category.category}</h4>
      </div>
      <div className="category-answer-list">
        {answerList.map(({ answer, score }) => (
          <div
            key={`${answer}_key_number_${Math.random() * 100}`}
            className="category-answer-list-item"
          >
            <h5 className="category-answer-list-item-answer">{answer}</h5>
            <h5 className="category-answer-list-item-score">{score}</h5>
          </div>
        ))}
      </div>
      {turn === 'stop' && (
        <div className="category-answer-unseted-points">
          <h4>{answerBeforePoints}</h4>
          <Form.Select
            name="setedPoints"
            size="sm"
            value={setedPoints}
            onChange={handleSelect}
          >
            <option value={0}>0</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Form.Select>
        </div>
      )}
      {turn !== 'stop' && (<div className="category-input-container container">
        <InputGroup className="mb-3">
          <FormControl
            value={answerInput}
            name="answerInput"
            placeholder="Answer"
            aria-label="Answer"
            aria-describedby="basic-addon1"
            onChange={handleChange}
          />
        </InputGroup>
      </div>)}
    </div>
  );
}
