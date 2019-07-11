import React from 'react';
import './App.css';
import Board from './components/Board/Board'
import { StoreProvider } from './stores/ConfigStore'
import { Container } from 'reactstrap';
import Score from './components/Score/Score';
import { Row, Col } from 'reactstrap';

function App() {
  return (
    <StoreProvider>
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
    </StoreProvider>
  );
}

export default App;
