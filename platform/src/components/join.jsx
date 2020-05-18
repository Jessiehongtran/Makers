import React from 'react';
import {IdeaData} from '../data/ideaData';
import axios from 'axios';
import '../styles/join.scss'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            comment: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }

    componentDidMount(){
        const projectId = localStorage.getItem('ideaId')
        axios.get('')
    }

    handleComment(event){
        console.log(event.target.value)
        this.setState({comment: event.target.value})
    }

    handleCommentSubmit(event){
        event.preventDefault();
        console.log('submit comment', this.state.comment)
    }
      


    render(){
        var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
       

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
                                <p>Share with us about yourself</p>
                                <form onSubmit={this.handleSubmit}>
                                <label>
                                    <input type="text" placeholder="Name" value={this.state.value} onChange={this.handleChange} />
                                </label>
                                    <input placeholder="Your intro" value={this.state.value} onChange={this.handleChange}/>
                                    <input placeholder="What can you contribute to the project?" value={this.state.value} onChange={this.handleChange}/>
                                <label>
                                    Select your role: <select value={this.state.value} onChange={this.handleChange}>
                                        <option value="teamLead">Team Lead</option>
                                        <option value="frontEnd">Front End</option>
                                        <option value="backEnd">Back End</option>
                                        <option value="ux">UX/UI</option>
                                    </select>
                                </label>
                                    <input placeholder="Your Linkedin Url" value={this.state.value} onChange={this.handleChange}/>
                                    <input type="submit" value="Join"/>
                                </form>
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="members">
                                <p>Member List</p>
                            </div>
                            <div className="thoughts">
                                <p>Thoughts</p>
                                <input 
                                    type="text" 
                                    onChange={this.handleComment}
                                />
                                <button type="submit" onClick={this.handleCommentSubmit}>Comment</button>
                                <img src="https://qph.fs.quoracdn.net/main-qimg-3234084c90912949b3136194769ebd72"/>
                            </div>
                        </div>
                    </div>
                )
            }
        }   
    }
}

export default Join;