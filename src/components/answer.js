import React from "react";

class Answer extends React.Component {
    render() {
        return (
            <div className="col-5">
            {this.props.selectedNumbers.map((number, index) =>
                <span key={index} onClick={() => this.props.onDeselect(number)}>{number}</span>
                )}
            </div>
        );
    }
}

export default Answer;