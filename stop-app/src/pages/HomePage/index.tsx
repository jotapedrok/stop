import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { FaUserAlt } from 'react-icons/fa';
import { BiXCircle } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import ITheme from '../../interfaces/ITheme.interface';
import { setThemes } from '../../store/themes.slice';
import './style.scss';
import { setUserName } from '../../store/user.slice';

type MyState = {
  themes: ITheme[];
  themeInput: string;
  usernameInput: string;
  hasError: {
    username: boolean;
    themeInput: boolean;
    themes: boolean;
  };
};

export default function HomePage() {
  const initialState: MyState = {
    themes: [],
    themeInput: '',
    usernameInput: '',
    hasError: {
      username: false,
      themeInput: false,
      themes: false,
    },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState(initialState);
  const { hasError, usernameInput, themeInput, themes } = state;
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
        <div className="home-page-section-up-themes-content container">
          <InputGroup className="mb-3" hasValidation>
            <FormControl
              isInvalid={hasError.themeInput}
              placeholder="Themes"
              aria-label="Themes"
              aria-describedby="basic-addon1"
              value={themeInput}
              onChange={e => {
                setState({ ...state, themeInput: e.target.value });
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
              if (themeInput === '') {
                setState({
                  ...state,
                  hasError: {
                    ...hasError,
                    themeInput: true,
                  },
                });
              } else {
                e.preventDefault();
                setState({
                  ...state,
                  hasError: {
                    ...hasError,
                    themeInput: false,
                  },
                  themes: [
                    ...themes,
                    { id: themes.length + 1, theme: themeInput },
                  ],
                  themeInput: '',
                });
              }
            }}
          >
            Add Theme
          </Button>
          <div className="home-page-section-up-themes-content-list container">
            {themes &&
              themes.map(e => (
                <div
                  key={`theme_${e.id}`}
                  className="home-page-section-up-themes-content-list-item"
                >
                  <h6>{e.theme}</h6>
                  <button
                    className="home-page-section-up-themes-content-list-item-button"
                    type="button"
                    onClick={() => {
                      const newThemes = themes.filter(
                        theme => theme.id !== e.id,
                      );
                      setState({ ...state, themes: newThemes });
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
          disabled={usernameInput === '' || themes.length === 0}
          variant="secondary"
          size="lg"
          onClick={e => {
            e.preventDefault();
            dispatch(setThemes(themes));
            dispatch(setUserName(usernameInput));
            navigate('/testando');
          }}
        >
          Play
        </Button>
      </section>
    </div>
  );
}
