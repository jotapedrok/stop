import React, { MouseEvent, useState } from 'react';
import { Button, Carousel, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../../components/Category';
import { RootState } from '../../store';
import { setDefault, setStop, setSum } from '../../store/turn.slice';

export default function InGame() {
  const [state, setState] = useState({
    index: 0,
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

  return (
    <div className="in-game">
      <div className="in-game-player-name container">
        <h4>{userName}</h4>
      </div>
      <Carousel
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
          <Button onClick={stopButtomClick} variant="primary" size="sm">
            Stop
          </Button>
        )}
        {turn === 'stop' && (
          <Button onClick={sumButtomClick} variant="primary" size="sm">
            Sum
          </Button>
        )}
      </div>
      <div className="in-game-add-category-container container">
        <InputGroup className="mb-3">
          <FormControl
            name="addCategoryInput"
            placeholder="Add Category"
            aria-label="Add Category"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <Button variant="primary" size="sm">
          Add Category
        </Button>
      </div>
    </div>
  );
}
