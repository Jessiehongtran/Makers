import React from 'react';
import '../styles/ideas.scss';

class Idea extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }


    render(){
        console.log('props in idea', this.props)
        return (
            <div className="idea">
                <p>Idea: {this.props.idea.idea}</p>
                <p>Target users: {this.props.idea.target}</p>
                <p>Impact: {this.props.idea.impact}</p>
                <p>Human Resources: {this.props.idea.HR}</p>
                <button>Join</button>
            </div>
        )
    }
}

export default Idea;