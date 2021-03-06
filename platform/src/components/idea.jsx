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
                <p><span className="title">Project:</span><span style={{color: `#${titleRandomColor}`, fontWeight: 'bold', fontSize: '20px'}}> {this.props.idea.project_name}</span></p>
                <p><span className="title">Category: </span><span className="text"> {this.props.idea.category}</span></p>
                <p><span className="title">Target users:</span>  <span className="text">{this.props.idea.target_user}</span></p>
                <p><span className="title">Impact:</span> <span className="text">{this.props.idea.impact}</span></p>
                <p><span className="title">Team: </span> <span className="text">{this.props.idea.human_resources}</span></p>
                <p><span className="title">Joined members: </span> <span className="text">{this.props.idea.join_count}</span></p>
                </div>
                <button className="join-btn" onClick={() => {
                    this.props.history.push('/join')
                    localStorage.setItem('ideaId', this.props.idea.id)
                    }}>
                        Join
                </button>
            </div>
        )
    }
}

export default Idea;