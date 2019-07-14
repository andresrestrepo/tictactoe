
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/ConfigStore';
import './Board.css';
import { FaTimes } from 'react-icons/fa';
import { FaCircleNotch } from 'react-icons/fa';
import { FaRedoAlt } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll'
import { useAlert } from 'react-alert'


const Board = observer(() => {

    const store = useStore();
    const alert = useAlert()

    const checkColumn = column => {
        const item1 = store.tableBoard[0][column];
        const item2 = store.tableBoard[1][column];
        const item3 = store.tableBoard[2][column];
        if (item1 === "" || item2 === "" || item3 === "") return false;
        return item1 === item2 && item1 === item3;
    }

    const checkRow = row => {
        const item1 = store.tableBoard[row][0];
        const item2 = store.tableBoard[row][1];
        const item3 = store.tableBoard[row][2];
        if (item1 === "" || item2 === "" || item3 === "") return false;
        return item1 === item2 && item1 === item3;
    }

    const checkDiagonal = direction => {
        let item1 = "";
        let item2 = "";
        let item3 = "";
        if (direction === 1) {
            item1 = store.tableBoard[0][0];
            item2 = store.tableBoard[1][1];
            item3 = store.tableBoard[2][2];
        } else if (direction === 2) {
            item1 = store.tableBoard[0][2];
            item2 = store.tableBoard[1][1];
            item3 = store.tableBoard[2][0];
        } else {
            return false;
        }

        if (item1 === "" || item2 === "" || item3 === "") return false;
        return item1 === item2 && item1 === item3;
    }

    const checkBoard = () => {

        let isWinnerByColumn = false;
        for (let i of [0, 1, 2]) {
            isWinnerByColumn = checkColumn(i);
            if (isWinnerByColumn) break;
        }

        let isWinnerByRow = false;
        for (let i of [0, 1, 2]) {
            isWinnerByRow = checkRow(i);
            if (isWinnerByRow) break;
        }

        let isWinnerByDiagonal1 = checkDiagonal(1);
        let isWinnerByDiagonal2 = checkDiagonal(2);

        return isWinnerByColumn || isWinnerByRow || isWinnerByDiagonal1 || isWinnerByDiagonal2;
    }

    const resetBoard = () => {
        store.tableBoard.map(row => {
            return row.fill("", 0, 3);
        })
        store.setNextOne("x");
        store.setHaveWinner(false);
        store.setlastChampion("");
    }

    const isBoardComplete = () => {
        let isComplete = true;
        store.tableBoard.map(row => {
            row.map(item => {
                if (item === "") {
                    isComplete = false;
                }
                return item;
            })
            return row;
        })
        return isComplete;
    }

    const handleSquareClick = event => {
        if (store.haveWinner) return;
        const col = event.target.getAttribute("col");
        const row = event.target.getAttribute("row");

        if (row === null || col === null) return;
        if (store.tableBoard[row][col] !== "") return;
        store.tableBoard[row][col] = store.nextOne;
        const haveWinner = checkBoard();
        if (haveWinner) {
            alert.show('We have a winner!');
            scrollToBottom();
            if (store.nextOne === "x") {
                store.incPlayer1Wins();
                store.setlastChampion("x");
            } else {
                store.incPlayer2Wins();
                store.setlastChampion("o");
            }
            store.setHaveWinner(true);
            setTimeout(() => {
                resetBoard();
            }, 3000)
        } else {
            if (isBoardComplete()) {
                alert.show('We have a tie!');
                setTimeout(() => {
                    resetBoard();
                }, 3000)
            } else {
                let nextOne = store.nextOne === "x" ? "o" : "x";
                store.setNextOne(nextOne);
            }
        }
    }

    const getRows = () => {
        return store.tableBoard.map((rows, rowIndex) => {
            let row = rows.map((cell, column) => <div onClick={handleSquareClick} key={`${column}-${rowIndex}`} col={column} row={rowIndex} className="square">
                {cell === "x" ? <div><FaTimes size="60px"></FaTimes></div> :
                    cell === "o" ? <div><FaCircleNotch size="60px"></FaCircleNotch></div> : ""}

            </div>)
            return <div key={rowIndex} className="game-row">{row}</div>
        })
    }

    const scrollToBottom = () => scroll.scrollToBottom();

    return (
        <div className="board">
            <div className="clear-icon"><FaRedoAlt title="Reset" onClick={resetBoard} size="25px"></FaRedoAlt></div>
            {getRows()}
        </div>
    )
});

export default Board;