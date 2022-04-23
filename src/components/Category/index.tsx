import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ICategory from '../../interfaces/ICategory.interface';
import { RootState } from '../../store';
import { sendActualRespost } from '../../store/turn.slice';
import './style.scss';

interface CategoryProps {
  category: ICategory;
}

export default function Category(props: CategoryProps) {
  const [state, setState] = useState({
    answerInput: '',
    answerBeforePoints: '',
    setedPoints: 0,
  });
  const { answerInput, answerBeforePoints, setedPoints } = state;

  const { category } = props;

  const dispatch = useDispatch();

  const { turnType } = useSelector((s: RootState) => s.turn);

  useEffect(() => {
    if (turnType === 'stop') {
      dispatch(
        sendActualRespost({
          category: category.category,
          score: 0,
          answer: answerInput,
        }),
      );
      setState({
        ...state,
        answerBeforePoints: state.answerInput,
        answerInput: '',
      });
    }
  }, [turnType]);

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
    dispatch(
      sendActualRespost({
        category: category.category,
        score: value,
        answer: answerBeforePoints,
      }),
    );
  };

  return (
    <div className="category">
      <div className="category-title">
        <h4>{category.category}</h4>
      </div>
      <div className="category-scrolling-box">
        <div className="category-answer-list">
          {category.answers.map(({ answer, score }) => (
            <div
              key={`${answer}_key_number_${Math.random() * 100}`}
              className="category-answer-list-item "
            >
              <h5 className="category-answer-list-item-answer">{answer}</h5>
              <h5
                className={`category-answer-list-item-score ${
                  Number(score) === 0 ? 'zero' : ''
                }`}
              >
                {score}
              </h5>
            </div>
          ))}
        </div>
        {turnType === 'stop' && (
          <div className="category-answer-unseted-points">
            {answerBeforePoints.length > 0 && <h4>{answerBeforePoints}</h4>}
            <Form.Select
              className="category-answer-unseted-points-select"
              name="setedPoints"
              size="sm"
              value={setedPoints}
              onChange={handleSelect}
            >
              <option value={0}>0</option>
              {answerBeforePoints.length > 0 && <option value={5}>5</option>}
              {answerBeforePoints.length > 0 && <option value={10}>10</option>}
            </Form.Select>
          </div>
        )}
        {turnType !== 'stop' && (
          <div className="category-input-container container">
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
          </div>
        )}
      </div>
    </div>
  );
}
