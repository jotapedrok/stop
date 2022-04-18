import React, { Component } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { reset } from '../../store/score.slice';
import './style.scss';
import { RootState, AppDispatch } from '../../store';

const mapStateToProps = (state: RootState) => ({
  score: state.score.scores,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetScoresDispatch: () => dispatch(reset()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// interface HeaderProps extends PropsFromRedux {}

interface HeaderState {
  score?: number;
}

class Header extends Component<PropsFromRedux, HeaderState> {
  constructor(props: PropsFromRedux) {
    super(props);
    this.state = {};
  }

  render() {
    const { score, resetScoresDispatch } = this.props;
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
                  onClick={() => resetScoresDispatch()}
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
}

export default connector(Header);
