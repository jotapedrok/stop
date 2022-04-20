import React, { useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Category from '../../components/Category';
import { RootState } from '../../store';

export default function InGame() {
  const [state, setState] = useState({
    index: 0,
  });
  const userName = useSelector((s: RootState) => s.user.userName);
  const categories = useSelector((s: RootState) => s.categories.categories);
  const handleSelect = (selectedIndex: number) => {
    setState({
      ...state,
      index: selectedIndex,
    });
  };
  return (
    <div className="in-game">
      <div className="in-game-player-name container">
        <h4>{userName}</h4>
      </div>
      <Carousel
        activeIndex={state.index}
        onSelect={i => handleSelect(i)}
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
        <Button variant="primary" size="sm">
          Stop
        </Button>
        <Button variant="primary" size="sm">
          Sum
        </Button>
      </div>
      <div className="in-game-add-category-container container">
        <Button variant="primary" size="sm">
          Add Category
        </Button>
      </div>
    </div>
  );
}
