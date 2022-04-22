import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { Button, Carousel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../../components/Category';
import { RootState } from '../../store';
import { addCategory } from '../../store/category.slice';
import { setStop, setSum } from '../../store/turn.slice';
import './style.scss';

export default function InGame() {
  const [state, setState] = useState({
    index: 0,
    addCategoryInput: '',
  });

  const userName = useSelector((s: RootState) => s.user.userName);
  const categories = useSelector((s: RootState) => s.categories.categories);
  const turn = useSelector((s: RootState) => s.turn.turn);

  const dispatch = useDispatch();

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
  };

  const addCategoryButtomClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(
      addCategory({
        category: state.addCategoryInput,
        id: categories.length + 1,
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
      </Carousel>
      <div className="in-game-buttons-container container">
        {turn !== 'stop' && (
          <Button onClick={stopButtomClick} variant="primary" size="lg">
            Stop
          </Button>
        )}
        {turn === 'stop' && (
          <Button onClick={sumButtomClick} variant="primary" size="lg">
            Sum
          </Button>
        )}
      </div>
      <div className="in-game-add-category-container container mt-5">
        <InputGroup className="mb-1">
          <FormControl
            className="in-game-add-category-container-input"
            name="addCategoryInput"
            placeholder="Add Category"
            aria-label="Add Category"
            aria-describedby="basic-addon1"
            onChange={handleChange}
            size="sm"
          />
        </InputGroup>
        <Button onClick={addCategoryButtomClick} variant="primary" size="sm">
          Add Category
        </Button>
      </div>
    </div>
  );
}
