import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faUsers, faHeart } from '@fortawesome/fontawesome-free-solid';
import '../styles/idea.scss'

class Idea extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            join_count: this.props.project.join_count,
            upvote: this.props.project.upvote,
            ideaAsText: false
        };
        this.showIdeaAsText = this.showIdeaAsText.bind(this)
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

    removeProject(projectId, e){
        e.stopPropagation();
        axios.delete(`https://makers-app.herokuapp.com/api/projects/delete/${projectId}`)
             .then(res => {
                 this.props.toRefresh()
             })
             .catch(err => {
                 console.log(err.message)
             })

        
    }

    updateCount(thing, e){
        e.stopPropagation();
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

    showIdeaAsText(){
        this.setState({ideaAsText: true})
    }


    render(){

        var idea = "";
        if (this.props.project.idea != null){
            if (this.props.project.idea.length > 50){
                for (var i = 0;i<this.props.project.idea.length; i++){
                    if (i <50){
                        idea += this.props.project.idea[i]
                    }
                }
                idea += "..."
            }
            else {
                idea = this.props.project.idea
            }
        } 

        const { ideaAsText } = this.state;

        let { bannerColor } = this.props;
        let borderColor = 'transparent'

        if (!ideaAsText ){
            bannerColor = '#fff'
            borderColor = '#EFEFEF'
        }
        
        return (
            <>
                <div 
                    className="each-project" 
                    style={{backgroundColor: bannerColor, border: `1px solid ${borderColor}`}}
                    onClick={() => this.getIntoProject()}
                >
                    {this.props.host
                    ? <div className="remove">
                        <i class="fas fa-trash-alt" onClick={e => this.removeProject(this.props.project.id, e)}></i>
                      </div>
                    : null}
                    <div >
                        { !ideaAsText 
                        ? <img alt="idea" onError={() => this.showIdeaAsText()} src={this.props.project.idea} style={{ width: '90%', marginTop: '20px'}} /> 
                        : <div className="project-headers">
                            <p className="project-name">{this.props.project.project_name || "Unnamed"}</p>
                            <p className="project-idea">{idea}</p>
                          </div>
                        }
                    </div>
                    <div className="icons">
                        <FontAwesomeIcon icon={faUsers}  style={{ marginRight: '5px' }} />
                        <p className="count">{this.state.join_count}</p>
                        <FontAwesomeIcon icon={faHeart} style={{ marginRight: '5px' }} onClick={e => this.updateCount("like", e)}/>
                        <p className="count">{this.state.upvote}</p>
                    </div>
                </div>
            </>
        )
    }
}

export default Idea;

