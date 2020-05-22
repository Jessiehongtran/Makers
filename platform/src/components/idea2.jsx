import React from 'react';
import axios from 'axios';
import '../styles/idea.scss'

class Idea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            join_count: this.props.project.join_count,
            upvote: this.props.project.upvote
        };
    }

    updateInProject(toChange){
        axios.patch(`https://makers-app.herokuapp.com/api/projects/edit/${this.props.project.id}`, toChange)
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err.message)
                })
    }

    updateCount(thing){
        if (thing === "join"){
            var new_join = this.state.join_count + 1
            this.setState({join_count: new_join})
            this.updateInProject({join_count: new_join})
        }
        else if (thing === "like"){
            var new_vote = this.state.upvote + 1
            this.setState({upvote: new_vote})
            this.updateInProject({upvote: new_vote})
        }
    }


    render(){

        console.log('props in Idea', this.props.project)

        return (
            <>
                <div className="each-project" style={{backgroundColor: this.props.bannerColor}}>
                    <div className="project-headers">
                        <p className="project-name">{this.props.project.project_name}</p>
                        <p className="project-idea">{this.props.project.idea}</p>
                    </div>
                    <div className="icons">
                        <i class="fas fa-users" onClick={() => this.updateCount("join")}></i>
                        <p className="count">{this.state.join_count}</p>
                        <i class="far fa-heart" onClick={() => this.updateCount("like")}></i>
                        <p className="count">{this.state.upvote}</p>
                    </div>
                </div>
                
            </>
        )
    }
}

export default Idea;

