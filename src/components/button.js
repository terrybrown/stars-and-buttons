import React from "react";

class Button extends React.Component {
    getButton = () => {
        switch(this.props.answerIsCorrect) {
            case true:
                return <button className="btn btn-success"
                        onClick={this.props.onAcceptAnswer}>
                    <i className="fa fa-check"></i>
                </button>
            case false: 
                return <button className="btn btn-danger"
                        onClick={this.props.onCheckAnswer}>
                        <i className="fa fa-times"></i>
                    </button>
            default:
                return <button className="btn btn-light" 
                    onClick={this.props.onCheckAnswer}
                    disabled={this.props.selectedNumbers.length === 0}>=</button>
        }
    }
    render() {
        return (
            <React.Fragment>{this.getButton()}</React.Fragment>
        );
    }
}

export default Button;