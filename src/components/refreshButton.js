import React from "react";

class RefreshButton extends React.Component {
    render() {
        
        return (
            <button className="btn btn-warning btn-sm" 
                disabled={this.props.remainingRefreshes === 0}
                onClick={this.props.onRefresh}>
                <i className="fa fa-refresh"></i> {this.props.remainingRefreshes}
            </button>
        );
    }
}

export default RefreshButton;