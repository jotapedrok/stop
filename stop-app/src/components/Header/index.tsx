import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/score.slice';
import { RootState } from '../../store';
import './style.scss';

// interface HeaderProps {}

export default function Header() {
  const dispatch = useDispatch();
  const score = useSelector((state: RootState) => state.score.scores);
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand bsPrefix="logo-container" href="/">
          STOP
        </Navbar.Brand>
        <Navbar.Text>{score}</Navbar.Text>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Item>
              <Nav.Link
                onClick={() => dispatch(reset())}
                className="btn"
                as="button"
              >
                Recomeçar
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="btn" as="button">
                Sair
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
