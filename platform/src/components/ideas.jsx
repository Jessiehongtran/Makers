import React from 'react';
import '../styles/ideas.scss';
import Idea from './idea';
import {IdeaData} from '../data/ideaData';
import IdeaFunctional from './ideaFunctional';
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

    render(){
        return (
            <div className="ideas-frame">
                {/* {console.log(this.state.ideas)} */}
                <button className="create-btn" onClick={() => {this.props.history.push('/create')}}>Create project</button>
                <div className="ideas">
                    {this.state.ideas.map(idea => <IdeaFunctional idea={idea} history={this.props.history}/>)}
                </div>
            </div>
        )
    }
}

export default Ideas;