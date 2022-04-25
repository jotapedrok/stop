import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { Button, Carousel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Category from '../../components/Category';
import { RootState } from '../../store';
import {
  addAnswers,
  addCategory,
  setCategories,
} from '../../store/category.slice';
import {
  ITurns,
  sendTurnResposts,
  setStop,
  setSum,
  setTurns,
} from '../../store/turn.slice';
import { increment } from '../../store/score.slice';
import './style.scss';
import TurnList from '../../components/TurnsList';
import { setUserName } from '../../store/user.slice';
import ICategory from '../../interfaces/ICategory.interface';

interface ILocalStorageDatas {
  turns: ITurns[];
  scores: number;
  categories: ICategory[];
}

export default function InGame() {
  const [state, setState] = useState({
    index: 0,
    addCategoryInput: '',
  });

  const userName = useSelector((s: RootState) => s.user.userName);
  const categories = useSelector((s: RootState) => s.categories.categories);
  const scores = useSelector((s: RootState) => s.score.scores);
  const { actualTurn, turnType, turns } = useSelector((s: RootState) => s.turn);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const getFromLocalStorage = (stopUsername: string | null) => {
    const getDatas = localStorage.getItem('stopDatas');
    const stopDatas = getDatas ? JSON.parse(getDatas) : null;
    if (stopDatas) {
      dispatch(setTurns(stopDatas.turns));
      dispatch(setCategories(stopDatas.categories));
      dispatch(setUserName(stopUsername));
    }
  };

  const refreshLocalStorage = () => {
    const getDatas = localStorage.getItem('stopDatas');
    const stopDatas: ILocalStorageDatas | null = getDatas
      ? JSON.parse(getDatas)
      : null;
    if (stopDatas) {
      stopDatas.scores = scores;
      stopDatas.turns = turns;
      stopDatas.categories = categories;
      localStorage.setItem('stopDatas', JSON.stringify(stopDatas));
    }
  };

  useEffect(() => {
    const stopUsername = localStorage.getItem('stopUsername');
    if (!stopUsername) {
      navigation('/');
    } else {
      getFromLocalStorage(stopUsername);
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
    const turnScore = actualTurn.answers.reduce(
      (acc, answer) => Number(answer.score) + acc,
      0,
    );
    dispatch(increment(Number(turnScore)));
    actualTurn.answers.forEach(answer => {
      dispatch(addAnswers(answer));
    });
    refreshLocalStorage();
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
    refreshLocalStorage();
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
