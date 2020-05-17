import React from 'react';
import {IdeaData} from '../data/ideaData';
import Comments from '../components/comments';
import '../styles/join.scss'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
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
                            <div className="thoughts">
                                <p>Thoughts</p>
                                <Comments /> 
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