import React from 'react';
import '../styles/ideas.scss';
import Idea from './idea';
import {IdeaData} from '../data/ideaData';

class Ideas extends React.Component {
    constructor(){
        super();
        this.state = {
            ideas: IdeaData

        };
    }


    render(){
        return (
            <div className="ideas">
                {this.state.ideas.map(idea => <Idea idea={idea}/>)}
            </div>
        )
    }
}

export default Ideas;