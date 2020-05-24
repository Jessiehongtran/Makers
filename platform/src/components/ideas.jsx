import React from 'react';
import '../styles/ideas.scss';
import Idea from './idea2';
import {IdeaData} from '../data/ideaData';
import axios from 'axios';

class Ideas extends React.Component {
    constructor(){
        super();
        this.state = {
            ideas: []

        };
    }
    componentDidMount(){
        axios.get(`https://makers-app.herokuapp.com/api/projects`)
            .then(res => {
                console.log('res in Ideas', res)
                this.setState({ideas: res.data})
            })
            .catch(err => {
                console.log(err.message)
            })
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
            <div className="ideas-frame">
                <div className="category">
                    <p>Web dev</p>
                    <p>Mobile</p>
                    <p>Game dev</p>
                    <p>Data science</p>
                    <p>Machine learning</p>
                </div>
                <div className="ideas">
                    {this.state.ideas.map(project => 
                        <Idea 
                            project={project} 
                            bannerColor ={`#${this.fullColorHex(this.getRandomInt(200,255), this.getRandomInt(200,255), this.getRandomInt(200,255))}`}
                            history={this.props.history}
                        />)}
                </div>
            </div>
        )
    }
}

export default Ideas;