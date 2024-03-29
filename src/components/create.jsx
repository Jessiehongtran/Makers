import React from 'react';
import axios from 'axios';
import "../styles/create.scss";
import { API_URL } from '../APIconfig'

class Create extends React.Component {
    constructor(){
        super();
        this.state = {
            // projectIdea:{
            project_name: "",
            category: "",
            target_user: "",
            impact: "",
            human_resources: "",
            join_count: 0
            // }
             
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        
        axios.post( `${API_URL}/api/projects`, this.state)
             .then(id => id)
             .catch(err => {
                 console.log(err.message)
             })
    }


    render(){

        return (
            <div className="create-frame">
                <div className="wrapper">
                    <h1>So what's on your mind?</h1>
                    <div className="info">
                        <form onSubmit = {this.handleSubmit}>
                            <input 
                                    placeholder="What's your idea in short" 
                                    onChange={this.handleChange}
                                    name="project_name"
                                />
                            {/* dropdown */}
                            <input 
                                    placeholder="Category"
                                    onChange={this.handleChange}
                                    name="category"
                                /> 
                            <input 
                                    placeholder="Target users"
                                    onChange={this.handleChange}
                                    name="target_user"

                                /> 
                            <input 
                                    placeholder="Impact"
                                    onChange={this.handleChange}
                                    name="impact"

                                /> 
                            <input 
                                    placeholder="Team includes"
                                    onChange={this.handleChange}
                                    name="human_resources"

                                />
                            <button className="create-btn">Create</button>
                            {/* Lead to sign in/sign up/create profile */}
                        </form>
                    </div>
               </div>
            </div>
        )
    }
}

export default Create;