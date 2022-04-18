import React, { ChangeEventHandler, Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import { FaUserAlt } from 'react-icons/fa';
import './style.scss';

type MyProps = {
  y: number;
};

type MyState = {
  themes: string[];
  themeInput: string;
  hasError: {
    username: boolean;
    themes: boolean;
  };
};

export default class HomePage extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      themes: [],
      themeInput: '',
      hasError: {
        username: false,
        themes: false,
      },
    };
  }

  render() {
    const { y } = this.props;
    const { themes, themeInput, hasError } = this.state;
    return (
      <div className="home-page container">
        <div className="home-page-name-content container mt-5">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              <FaUserAlt />
            </InputGroup.Text>
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <div className="home-page-themes-content container">
          <InputGroup className="mb-3" hasValidation>
            <FormControl
              isInvalid={hasError.themes}
              placeholder="Themes"
              aria-label="Themes"
              aria-describedby="basic-addon1"
              value={themeInput}
              onChange={e => {
                this.setState({ themeInput: e.target.value });
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
                this.setState({
                  hasError: {
                    ...hasError,
                    themes: true,
                  },
                });
              } else {
                e.preventDefault();
                this.setState({
                  hasError: {
                    ...hasError,
                    themes: false,
                  },
                });
                this.setState(prevState => {
                  const newThemes = [...prevState.themes, themeInput];
                  return { themes: newThemes };
                });
                this.setState({ themeInput: '' });
              }
            }}
          >
            Add
          </Button>
          <div className="home-page-themes-content-list container">
            {themes && themes.map(e => <h6 key={`theme_${e}`}>{e}</h6>)}
          </div>
        </div>
      </div>
    );
  }
}
