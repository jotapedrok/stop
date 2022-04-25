import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { BiXCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import ICategory from '../../interfaces/ICategory.interface';
import { setCategories } from '../../store/category.slice';
import './style.scss';
import { setUserName } from '../../store/user.slice';

type MyState = {
  categories: ICategory[];
  categoryInput: string;
  usernameInput: string;
  hasError: {
    username: boolean;
    categoryInput: boolean;
    categories: boolean;
  };
};

export default function HomePage() {
  const initialState: MyState = {
    categories: [],
    categoryInput: '',
    usernameInput: '',
    hasError: {
      username: false,
      categoryInput: false,
      categories: false,
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const LSUsername = localStorage.getItem('stopUsername');
    if (LSUsername) {
      dispatch(setUserName(LSUsername));
      navigate('/stop/game');
    }
  }, []);

  const [state, setState] = useState(initialState);
  const { hasError, usernameInput, categoryInput, categories } = state;
  return (
    <div className="home-page container">
      <section className="home-page-section-up">
        <div className="home-page-section-up-name-content container mt-5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaUserAlt />
            </InputGroup.Text>
            <FormControl
              isInvalid={hasError.username}
              value={usernameInput}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={e => {
                if (e.target.value === '') {
                  setState({
                    ...state,
                    usernameInput: e.target.value,
                    hasError: {
                      ...hasError,
                      username: true,
                    },
                  });
                } else {
                  setState({
                    ...state,
                    usernameInput: e.target.value,
                    hasError: {
                      ...hasError,
                      username: false,
                    },
                  });
                }
              }}
            />
          </InputGroup>
        </div>
        <div className="home-page-section-up-categories-content container">
          <InputGroup className="mb-3" hasValidation>
            <FormControl
              isInvalid={hasError.categoryInput}
              placeholder="Categories"
              aria-label="Categories"
              aria-describedby="basic-addon1"
              value={categoryInput}
              onChange={e => {
                setState({ ...state, categoryInput: e.target.value });
              }}
            />
          </InputGroup>
          <FormControl.Feedback type="invalid">
            Please choose a username.
          </FormControl.Feedback>
          <Button
            variant="primary"
            size="lg"
            onClick={e => {
              if (categoryInput === '') {
                setState({
                  ...state,
                  hasError: {
                    ...hasError,
                    categoryInput: true,
                  },
                });
              } else {
                e.preventDefault();
                setState({
                  ...state,
                  hasError: {
                    ...hasError,
                    categoryInput: false,
                  },
                  categories: [
                    ...categories,
                    {
                      id: categories.length + 1,
                      category: categoryInput,
                      answers: [],
                    },
                  ],
                  categoryInput: '',
                });
              }
            }}
          >
            Add Category
          </Button>
          <div className="home-page-section-up-categories-content-list container">
            {categories &&
              categories.map(e => (
                <div
                  key={`category_${e.id}`}
                  className="home-page-section-up-categories-content-list-item"
                >
                  <h6>{e.category}</h6>
                  <button
                    className="home-page-section-up-categories-content-list-item-button"
                    type="button"
                    onClick={() => {
                      const newCategories = categories.filter(
                        category => category.id !== e.id,
                      );
                      setState({ ...state, categories: newCategories });
                    }}
                  >
                    <BiXCircle />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="home-page-section-down container d-grid gap-2">
        <Button
          disabled={usernameInput === '' || categories.length === 0}
          variant="secondary"
          size="lg"
          onClick={e => {
            e.preventDefault();
            dispatch(setCategories(categories));
            dispatch(setUserName(usernameInput));
            navigate('/stop/game');
            localStorage.setItem('stopUsername', usernameInput);
            localStorage.setItem(
              'stopDatas',
              JSON.stringify({ categories, turns: [], scores: 0 }),
            );
          }}
        >
          Play
        </Button>
      </section>
    </div>
  );
}
