import React from 'react';
import axios from 'axios';
import '../styles/ideas.scss';
import Idea from './idea2';
import '../styles/yourProject.scss';
import { API_URL } from '../APIconfig'

class Mine extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            projects: [],
            reFresh: false
        }

        this.toRefresh = this.toRefresh.bind(this)
    }

    getProjects(userId){
        axios.get(`${API_URL}/api/user_project/projects/${userId}`)
             .then(res => {
                this.setState({projects: res.data})
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    componentDidMount(){
        const userId = localStorage.getItem('userId')
        this.getProjects(userId)
    }

    toRefresh(){
        // this.setState({reFresh: true})
        const userId = localStorage.getItem('userId')
        this.getProjects(userId)
    }

    refresh(){
        const userId = localStorage.getItem('userId')
        this.getProjects(userId)
    }
    

    rgbToHex(rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };

    fullColorHex(r,g,b) { 
        var red = this.rgbToHex(r); 
        var green = this.rgbToHex(g); 
        var blue = this.rgbToHex(b); 
        return red+green+blue; 
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
      }


    render(){
        return (
            <div className="mine">
                {this.state.projects.length > 0
                ? <div className="projects" >
                        {this.state.projects.map(project => 
                            <Idea 
                                project={project} 
                                bannerColor ={`#${this.fullColorHex(this.getRandomInt(200,255), this.getRandomInt(200,255), this.getRandomInt(200,255))}`}
                                history={this.props.history}
                                host= {true}
                                toRefresh = {this.toRefresh}
                            />)}
                  </div>
                : <div className="message">
                    <h3>You have not created any project</h3>
                    <div className="btns">
                        <button 
                            className="home-btn"
                            onClick={() => this.props.history.push('/')}
                        >Home</button>
                        <button
                            className="create-btn"
                            onClick={() => this.props.history.push('/create')}
                        >Create project</button>
                    </div>
                    
                  </div>
                }
            </div>
        )
    }
}

export default Mine