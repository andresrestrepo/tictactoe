import React from 'react';
import { observer } from 'mobx-react-lite';
import './Score.css'
import { Row, Col } from 'reactstrap';
import { useStore } from '../../stores/ConfigStore';
import { FaTimes } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';
import { FaTrophy } from 'react-icons/fa';



const Score = observer(() => {
    const store = useStore();

    const iconSize = "22px";

    const nextPlayerIcon = store.nextOne === "x" ? <FaTimes size={iconSize}></FaTimes> :
        store.nextOne === "o" ? <FaCircleNotch size={iconSize}></FaCircleNotch> : ""

    const champion = store.haveWinner ? <div className="win-message">Champion!!!</div> : "";
    const championImage = store.lastChampion === "x" ? <FaTimes size="30px"></FaTimes> :
        store.lastChampion === "o" ? <FaCircleNotch size="30px"></FaCircleNotch> : ""
    return (
        <div className="score">
            <div className="information-title">Information</div>
            <Row>
                <Col xs="6">Player 1:</Col>
                <Col xs="6"><FaTimes size={iconSize}></FaTimes></Col>
            </Row>
            <Row>
                <Col xs="6">Player 2:</Col>
                <Col xs="6"><FaCircleNotch size={iconSize}></FaCircleNotch></Col>
            </Row><br></br>
            <Row>
                <Col xs="6">Next Player:</Col>
                <Col xs="6"><div className="container-next-player-icon">{nextPlayerIcon}</div></Col>
            </Row><br></br>

            <Row>
                <Col xs="6">Player 1 wins:</Col>
                <Col xs="6">{store.player1Wins}</Col>
            </Row>
            <Row>
                <Col xs="6">Player 2 wins:</Col>
                <Col xs="6">{store.player2Wins}</Col>
            </Row><br></br>
            <div className="container-champion">
                {champion}{championImage}
                <FaTrophy size="30px"></FaTrophy>
            </div>

        </div>
    )
})

export default Score