import React from 'react';
import './App.css';
import Board from './components/Board/Board'
import { StoreProvider } from './stores/ConfigStore'
import { Container } from 'reactstrap';
import Score from './components/Score/Score';
import { Row, Col } from 'reactstrap';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options = {
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE
}

function App() {
  return (
    <StoreProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <Container>
          <div className="title">TicTacToe</div>
          <Row>
            <Col sm="12" md="6">
              <div>
                <Board></Board>
              </div>
            </Col>
            <Col sm="12" md="6">
              <Score></Score>
            </Col>
          </Row>
        </Container>
      </AlertProvider>
    </StoreProvider>
  );
}

export default App;
