import React from 'react';
import { observer } from 'mobx-react-lite';
import './Score.css'
import { Row, Col } from 'reactstrap';
import { useStore } from '../../stores/ConfigStore';
import { FaTimes } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';


const Score = observer(() => {
    const store = useStore();

    const iconSize = "22px";

    const nextPlayerIcon = store.nextOne === "x" ? <FaTimes size={iconSize}></FaTimes> :
        store.nextOne === "o" ? <FaCircleNotch size={iconSize}></FaCircleNotch> : ""
    return (
        <div className="score">
            <div className="information-title">Information</div>
            <Row>
                <Col sm="6">Player 1:</Col>
                <Col sm="6"><FaTimes size={iconSize}></FaTimes></Col>
            </Row>
            <Row>
                <Col sm="6">Player 2:</Col>
                <Col sm="6"><FaCircleNotch size={iconSize}></FaCircleNotch></Col>
            </Row><br></br>
            <Row>
                <Col sm="6">Next Player:</Col>
                <Col sm="6"><div className="container-next-player-icon">{nextPlayerIcon}</div></Col>
            </Row><br></br>

            <Row>
                <Col sm="6">Player 1 wins:</Col>
                <Col sm="6">{store.player1Wins}</Col>
            </Row>
            <Row>
                <Col sm="6">Player 2 wins:</Col>
                <Col sm="6">{store.player2Wins}</Col>
            </Row>
        </div>
    )
})

export default Score