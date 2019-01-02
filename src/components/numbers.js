import React from "react";
import { range } from 'lodash';

class Numbers extends React.Component {
    numberClassName = (number) => {
        if (this.props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (this.props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
    };

    render() {
        return (
            <div className="card text-center">
                <div>
                    {Numbers.arrayOfNumbers.map((number, index) => 
                        <span key={index} className={this.numberClassName(number)}
                            onClick={() => this.props.onAnswer(number)}>{number}</span>
                    )}
                </div>
            </div>
        );
    }
}
Numbers.arrayOfNumbers = range(1, 10);

export default Numbers;