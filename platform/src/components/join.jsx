import React from 'react';
import {IdeaData} from '../data/ideaData';
import axios from 'axios';
import '../styles/join.scss'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : {
                name: "",
                identity: "",
                valueAdded: "",
                role: "",
                linkedin: ""
            },
            value: '',
            comment: '',
            avatar: '',
            comments: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({userInfo:{...this.state.userInfo,[event.target.name]: event.target.value}});
      }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted: ',  this.state.userInfo);
      }

    componentDidMount(){
        const projectId = localStorage.getItem('ideaId')
        axios.get(`https://makers-app.herokuapp.com/api/comments/${projectId}`)
             .then(res => {
                 this.setState({comments: res.data})
             })
             .catch(err => {
                 console.log(err)
             })
    }

    handleComment(event){
        console.log('in handleComment', event.target.value)
        this.setState({comment: event.target.value})
    }

    handleCommentSubmit(event){
        event.preventDefault();
        //with current architecture, have to make sure a user exists before posting a comment
        //seed a user and give it id to 1 is a way to trick for anonymous
        var userId = 1
        if (this.state.avatar.length > 0){
            userId = localStorage.getItem('userId')
        }
        const projectId = localStorage.getItem('ideaId')

        const comment_to_post = {
            user_id: userId,
            project_id: projectId,
            comment: this.state.comment
        }
        
        axios.post('https://makers-app.herokuapp.com/api/comments', comment_to_post)
             .then(res => {
                 console.log('res in posting comment', res)
             })
             .catch(err => {
                 console.log(err.message)
             })
    }
      


    render(){
        console.log('userInfo', this.state.userInfo)
        var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
        const avatar = this.state.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNWvAlntajQ9uki4_E508d7cB1qdQtc_UngZ2A5mJArKpontMT&usqp=CAU"
       

        for(let i = 0; i < IdeaData.length; i++){
            if (IdeaData[i].id == localStorage.getItem('ideaId')){
                console.log('fired')
                return (
                    <div className="join">
                        <p><span className="title">Project:</span><span style={{color: `#${titleRandomColor}`, fontWeight: 'bold', fontSize: '20px'}}> {IdeaData[i].idea}</span></p>
                        <div className="info">
                            <div className="project-info">
                                    <p><span className="title">Category: </span><span className="text"> {IdeaData[i].category}</span></p>
                                    <p><span className="title">Target users:</span>  <span className="text">{IdeaData[i].target}</span></p>
                                    <p><span className="title">Impact:</span> <span className="text">{IdeaData[i].impact}</span></p>
                                    <p><span className="title">Team: </span> <span className="text">{IdeaData[i].HR}</span></p>
                                    <p><span className="title">Host: </span> <span className="text">{IdeaData[i].host}</span></p>
                                    <p><span className="title">Joined members: </span> <span className="text">{IdeaData[i].join_count}</span></p>
                            </div>
                            <div className="member-info">
                                <p>Give us an idea about you</p>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <input 
                                            type="text" 
                                            placeholder="Your name" 
                                            name="name"
                                            onChange={this.handleChange} 
                                        />
                                    </label>
                                    <label>
                                        Who you are?
                                        <input 
                                            placeholder="I am" 
                                            name="identity" 
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label>
                                        What can you bring to the table?
                                        <input 
                                            placeholder="I can" 
                                            name="valueAdded"
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label>
                                        Select your role: <select  
                                            name="role"
                                            onChange={this.handleChange}>
                                            <option value="teamLead">Team Lead</option>
                                            <option value="frontEnd">Front End</option>
                                            <option value="backEnd">Back End</option>
                                            <option value="ux">UX/UI</option>
                                        </select>
                                    </label>
                                    <input 
                                        placeholder="Your Linkedin Url" 
                                        name="linkedin"
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit">Ask to join</button>
                                </form>
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="thoughts">
                                <p>Thoughts</p>
                                <form>
                                    <img className="avatar" src={avatar}/>
                                    <input 
                                        type="text" 
                                        onChange={this.handleComment}
                                    />
                                    <button type="submit" onClick={this.handleCommentSubmit}>Send</button>
                                </form>
                                <div className="showComments">
                                {this.state.comments.map(each => 
                                    <div className="each-comment">
                                        <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNWvAlntajQ9uki4_E508d7cB1qdQtc_UngZ2A5mJArKpontMT&usqp=CAU"/>
                                        <p>{each.comment}</p>
                                    </div>
                                )}
                                
                                </div>
                                
                                {/* <img src="https://qph.fs.quoracdn.net/main-qimg-3234084c90912949b3136194769ebd72"/> */}
                            </div>
                            <div className="members">
                                <p>Member List</p>
                            </div>
                        </div>
                    </div>
                )
            }
        }   
    }
}

export default Join;