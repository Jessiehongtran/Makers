import React from 'react';
import {IdeaData} from '../data/ideaData';
import '../styles/join.scss'

class Join extends React.Component {
    constructor(){
        super();
        this.state = {
           
        };
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
                                    <p>Share with us about you</p>
                                    <input placeholder="What can you contribute to the project?"/>
                                    <input placeholder="Your intro"/>
                                    <input placeholder="Your Linkedin Url"/>
                                    <button>Join</button>
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="members">
                                <p>Member List</p>
                            </div>
                            <div className="thoughts">
                                <p>Thoughts</p>
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