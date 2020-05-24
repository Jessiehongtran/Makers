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

    getIntoProject(){
        this.props.history.push('/join')
        localStorage.setItem('ideaId', this.props.project.id)
        localStorage.setItem('bannerColor', this.props.bannerColor)
    }


    render(){

        console.log('project', this.props.project.idea)

        var idea = "";
        if (this.props.project.idea != null){
            if (this.props.project.idea.length > 65){
                for (var i = 0;i<this.props.project.idea.length; i++){
                    if (i <65){
                    idea += this.props.project.idea[i]
                    }
                }
                idea += "..."
            }
            else {
                idea = this.props.project.idea
            }
        } 
        
        return (
            <>
                <div 
                    className="each-project" 
                    style={{backgroundColor: this.props.bannerColor}}
                    onClick={() => this.getIntoProject()}
                >
                
                    <div className="project-headers">
                        <p className="project-name">{this.props.project.project_name || "Unnamed"}</p>
                        <p className="project-idea">{idea}</p>
                    </div>
                    <div className="icons">
                        <i class="fas fa-users"></i>
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

