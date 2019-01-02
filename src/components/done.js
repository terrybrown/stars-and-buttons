import React from "react";

class Done extends React.Component {
    render() {
        
        return (
            <React.Fragment>
                <h2>{this.props.doneStatus}</h2>
                <button className="btn btn-secondary" onClick={this.props.onResetGame}>Play again</button>
            </React.Fragment>
        );
    }
}

export default Done;