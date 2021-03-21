import React from 'react';
import axios from 'axios';
import "../styles/create.scss"

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
        console.log(this.state)
        
        axios.post('https://makers-app.herokuapp.com/api/projects', this.state)
             .then(id => {
                 console.log('id', id)
                 // this.props.history.push('/join')
             })
             .catch(err => {
                 console.log(err.message)
             })
    }


    render(){

        console.log('category_di', this.state.project.category_id)

        if (this.state.project.category_id === "0"){
            this.state.showOtherField = true
        }

        return (
            <div>
                <h1>So what's on your mind?</h1>
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
                   <button>Create</button>
                   {/* Lead to sign in/sign up/create profile */}
               </form>
            </div>
        )
    }
}

export default Create;