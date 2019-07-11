export function createGameStore() {

    return {
        tableBoard: [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        nextOne: "x",
        setNextOne(value) {
            this.nextOne = value;
        },

        player1Wins: 0,
        player2Wins: 0,
        incPlayer1Wins() {
            this.player1Wins++;
        }, 
        incPlayer2Wins() {
            this.player2Wins++;
        }

    }
}