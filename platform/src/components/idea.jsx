import React from 'react';
import '../styles/ideas.scss';

class Idea extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }


    render(){
        console.log('props in idea', this.props)
        var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
        

        return (
            <div className="idea">
                <div className="project-info">
                <p><span className="title">Project:</span><span style={{color: `#${titleRandomColor}`, fontWeight: 'bold', fontSize: '20px'}}> {this.props.idea.idea}</span></p>
                <p><span className="title">Category: </span><span className="text"> {this.props.idea.category}</span></p>
                <p><span className="title">Target users:</span>  <span className="text">{this.props.idea.target}</span></p>
                <p><span className="title">Impact:</span> <span className="text">{this.props.idea.impact}</span></p>
                <p><span className="title">Team: </span> <span className="text">{this.props.idea.HR}</span></p>
                </div>
                <button className="join-btn">Join</button>
            </div>
        )
    }
}

export default Idea;