import React from "react";
import _ from 'lodash';

class Stars extends React.Component {

    render() {
        return (
            <div className="col-5">
               {_.range(this.props.numberOfStars).map(index => 
                    <i key={index} className="fa fa-star"></i>    
                )}
            </div>
        );
    }
}

export default Stars;