import React from 'react';
import '../styles/ideas.scss';
import Idea from './idea';
import Axios from 'axios';
// import {IdeaData} from '../data/ideaData';

class Ideas extends React.Component {
    constructor(){
        super();
        this.state = {
            ideas: []

        };
    }

    componentDidMount(){
        Axios.get('https://makers-app.herokuapp.com/api/projects')
             .then(res => {
                 console.log('res in ideas', res)
                 this.setState({ideas: res.data})
             })
             .catch(err => {
                 console.log(err.message)
             })
    }


    render(){
        return (
            <div className="ideas-frame">
                <button className="create-btn" onClick={() => {this.props.history.push('/create')}}>Create project</button>
                <div className="ideas">
                    {this.state.ideas.map(idea => <Idea idea={idea} history={this.props.history}/>)}
                </div>
            </div>
        )
    }
}

export default Ideas;