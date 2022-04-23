import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Button, Carousel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Category from '../../components/Category';
import { RootState } from '../../store';
import { addAnswers, addCategory } from '../../store/category.slice';
import { sendTurnResposts, setStop, setSum } from '../../store/turn.slice';
import { increment } from '../../store/score.slice';
import './style.scss';
import TurnList from '../../components/TurnsList';

export default function InGame() {
  const [state, setState] = useState({
    index: 0,
    addCategoryInput: '',
  });

  const userName = useSelector((s: RootState) => s.user.userName);
  const categories = useSelector((s: RootState) => s.categories.categories);
  const { actualTurn, turnType, turns } = useSelector((s: RootState) => s.turn);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (userName.length < 1 || categories.length < 1) {
      navigation('/');
    }
  }, []);

  const handleCarouselSelect = (selectedIndex: number) => {
    setState({
      ...state,
      index: selectedIndex,
    });
  };

  const stopButtomClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setStop());
  };

  const sumButtomClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setSum());
    dispatch(sendTurnResposts());
    const scores = actualTurn.answers.reduce(
      (acc, answer) => Number(answer.score) + acc,
      0,
    );
    dispatch(increment(Number(scores)));
    actualTurn.answers.forEach(answer => {
      dispatch(addAnswers(answer));
    });
  };

  const calculateTurns = () => {
    const numberOfTurns = turns.length;
    const result = [];
    for (let i = numberOfTurns; i >= 1; i -= 1) {
      result.push({
        score: 0,
        answer: '',
      });
    }
    return result;
  };

  const addCategoryButtomClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      addCategory({
        category: state.addCategoryInput,
        id: categories.length + 1,
        answers: calculateTurns(),
      }),
    );
    setState({
      ...state,
      addCategoryInput: '',
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="in-game">
      <div className="in-game-player-name container">
        <h4>{userName}</h4>
      </div>
      <Carousel
        variant="dark"
        activeIndex={state.index}
        onSelect={i => handleCarouselSelect(i)}
        className="in-game-categories-container"
        interval={null}
      >
        {categories.map(category => (
          <Carousel.Item key={category.id}>
            <Category category={category} />
          </Carousel.Item>
        ))}
        <Carousel.Item>
          <TurnList />
        </Carousel.Item>
      </Carousel>
      <div className="in-game-buttons-container container">
        {turnType !== 'stop' && (
          <Button onClick={stopButtomClick} variant="primary" size="lg">
            Stop
          </Button>
        )}
        {turnType === 'stop' && (
          <Button onClick={sumButtomClick} variant="primary" size="lg">
            Sum
          </Button>
        )}
      </div>
      <div className="in-game-add-category-container container mt-5">
        <InputGroup className="mb-1">
          <FormControl
            className="in-game-add-category-container-input"
            value={state.addCategoryInput}
            name="addCategoryInput"
            placeholder="Add Category"
            aria-label="Add Category"
            aria-describedby="basic-addon1"
            onChange={handleChange}
            size="sm"
          />
        </InputGroup>
        <Button
          disabled={!state.addCategoryInput.length}
          onClick={addCategoryButtomClick}
          variant="primary"
          size="sm"
        >
          Add Category
        </Button>
      </div>
    </div>
  );
}
