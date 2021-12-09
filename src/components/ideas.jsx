import React from 'react';
import '../styles/ideas.scss';
import Idea from './idea2';
import axios from 'axios';
import { API_URL } from '../APIconfig';
import Loader from '../components/loader';
// import {IdeaData} from '../data/ideaData';

class Ideas extends React.Component {
    constructor(){
        super();
        this.state = {
            ideas: [],
            shownCates: [],
            otherCates: [],
            filteredIdeas: []

        };
    }
    componentDidMount(){
        axios.get(`${API_URL}/api/category`)
            .then(res => {
                //slice to get data of 'other' categories
                this.setState({shownCates: res.data.slice(0,5)})
                if (res.data.length >5){
                    this.setState({otherCates: res.data.slice(5)})
                }

            })
            .catch(err => {
                console.log(err.message)
            })
        axios.get(`${API_URL}/api/projects`)
            .then(res => {
                this.setState({ideas: res.data})
                this.setState({filteredIdeas: res.data})
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

    filter(categoryId){
        var ideaList = []
        if (categoryId === 0){
            ideaList = this.state.ideas
        }
        else {
            for (var i =0; i<this.state.ideas.length; i++){
                if (categoryId === this.state.ideas[i].category_id){
                    ideaList.push(this.state.ideas[i])
                }
            }
        }

        this.setState({filteredIdeas: ideaList})
    }


    render(){

        const { shownCates, otherCates, filteredIdeas } = this.state;
        
        return (
            <>
                {filteredIdeas.length >0
                ? <div className="ideas-frame">
                    <div className="category">
                        <p onClick={() => this.filter(0)}>All</p>
                        {shownCates.length >0
                        ? shownCates.map(obj => 
                            <p onClick={() => this.filter(obj.id)}>{obj.category}</p>
                            )
                        : null}
                        <select onChange={e => this.filter(e.target.value)}>
                            <option>Others</option>
                            { otherCates.length >0 
                            ? this.state.otherCates.map(obj => <option value={obj.id}>{obj.category}</option>)
                            : null }
                        </select>
                    </div>
                    <div className="ideas">
                        {filteredIdeas.map(project => 
                            <Idea 
                                project={project} 
                                bannerColor ={`#${this.fullColorHex(this.getRandomInt(200,255), this.getRandomInt(200,255), this.getRandomInt(200,255))}`}
                                history={this.props.history}
                            />)}
                    </div>
                </div>
                : <Loader />}
            </>
        )
    }
}

export default Ideas;