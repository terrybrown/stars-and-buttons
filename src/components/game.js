import React from "react";
import {Stars, Button, Answer, Numbers, RefreshButton, Done } from "./"
import _ from "lodash";

class Game extends React.Component {

    static getRandomNumberOfStars = () => {
        return 1 + Math.floor(Math.random()*9)
    }
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: Game.getRandomNumberOfStars(),
        answerIsCorrect: null,
        remainingRefreshes: 5,
        doneStatus: null
    });
    state = Game.initialState();
    resetGame = () => { this.setState(Game.initialState()); };

    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0 || this.state.usedNumbers.indexOf(clickedNumber) >= 0)
            return;

        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };

    deselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter( number => number !== clickedNumber)
        }));
    };

    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((accumulatedResult, value) => accumulatedResult + value, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            numberOfStars: Game.getRandomNumberOfStars(),
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            answerIsCorrect: null,
            selectedNumbers: []
        }), this.updateDoneStatus);
    }
    refreshStars = () => {
        if (this.state.remainingRefreshes === 0) 
        {
            return;
        }
        this.setState(prevState => ({
            remainingRefreshes: prevState.remainingRefreshes - 1,
            numberOfStars: Game.getRandomNumberOfStars(),
            answerIsCorrect: null,
            selectedNumbers: []
        }), this.updateDoneStatus);
    };

    possibleCombinationSum = function(arr, n) {
        // from bit.ly/s-pcs
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
          arr.pop();
          return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount ; i++ ) {
          var combinationSum = 0;
          for (var j=0 ; j < listSize ; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
          }
          if (n === combinationSum) { return true; }
        }
        return false;
    };

    possibleSolutions = ({numberOfStars, usedNumbers}) => {
        const possibleNumbers = _.range(1, 10).filter( number => usedNumbers.indexOf(number) === -1);

        return this.possibleCombinationSum(possibleNumbers, numberOfStars);
    };

    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done.  Nice one!' }
            }
            if (prevState.remainingRefreshes === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game over!' }
            }
        });
    };


    render() {
        const {
            selectedNumbers,
            numberOfStars,
            answerIsCorrect,
            usedNumbers,
            remainingRefreshes,
            doneStatus
        } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                <Stars numberOfStars={numberOfStars} />
                
                <div className="col-2 text-center">
                    <Button selectedNumbers={selectedNumbers} 
                        onCheckAnswer={this.checkAnswer} 
                        onAcceptAnswer={this.acceptAnswer}
                        answerIsCorrect={answerIsCorrect}
                        remainingRefreshes={remainingRefreshes} />
                        <br /><br />
                    <RefreshButton remainingRefreshes={remainingRefreshes} onRefresh={this.refreshStars} />
                </div>
                <Answer selectedNumbers={selectedNumbers} onDeselect={this.deselectNumber} />
                </div>
                <br />
                <div className="row">
                    <div className="col-12 text-center">
                        {doneStatus ?
                            <Done doneStatus={doneStatus} onResetGame={this.resetGame} /> :
                            <Numbers onAnswer={this.selectNumber} selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;