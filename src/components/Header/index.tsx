import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/score.slice';
import { RootState } from '../../store';
import './style.scss';
import { categoriesOnExit, removeAllAnswers } from '../../store/category.slice';
import { onReset } from '../../store/turn.slice';
import { userNameOnExit } from '../../store/user.slice';

// interface HeaderProps {}

export default function Header() {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.scores);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand bsPrefix="logo-container" href="/">
          STOP
        </Navbar.Brand>
        {location.pathname === '/stop/game' ? (
          <Navbar.Text className="score">{score}</Navbar.Text>
        ) : (
          <div />
        )}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {location.pathname === '/stop/game' && (
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    dispatch(reset());
                    dispatch(removeAllAnswers());
                    dispatch(onReset());
                  }}
                  className="btn"
                  as="button"
                >
                  Restart
                </Nav.Link>
              </Nav.Item>
            )}
            {location.pathname === '/stop/game' && (
              <Nav.Item>
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem('stopUsername');
                    localStorage.removeItem('stopDatas');
                    dispatch(reset());
                    dispatch(onReset());
                    dispatch(categoriesOnExit());
                    dispatch(userNameOnExit());
                    navigate('/stop');
                  }}
                  className="btn"
                  as="button"
                >
                  Exit
                </Nav.Link>
              </Nav.Item>
            )}
            <Nav.Item>
              <Nav.Link href="https://jotapedrok.github.io">About</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
