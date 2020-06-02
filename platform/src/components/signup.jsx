import React from 'react';
import '../styles/signUp.scss'
import axios from 'axios';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e){
        console.log('changing')
        this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    handleSubmit(e){
        e.preventDefault()
        console.log('submitted')
        console.log(this.state.user)

        //make a post request to submit user
        const userToPost = {
            first_last_name : this.state.user.firstName + " " + this.state.user.lastName,
            email: this.state.user.email,
            password: this.state.user.firstName
        }

        console.log("userToPost", userToPost)
        axios.post(`https://makers-app.herokuapp.com/api/users`, userToPost)
             .then(res => {
                 console.log("user created successfully")
             })
             .catch(err => {
                 console.log(err.message)
             })

        this.props.history.push('/create')
    }

    render(){

        return (
            <div className="signUp">
                <img src="https://i.pinimg.com/originals/d8/22/b9/d822b94012d78d2a2eb5e448e8f2d5a5.png"/>
                
                    <form onSubmit={this.handleSubmit}>
                        <h3>Sign up to make stuff</h3>
                        <div className="name">
                            <input 
                                placeholder="First name"
                                type="text"
                                name="firstName"
                                onChange={this.handleChange}
                            />
                            <input 
                                placeholder="Last name"
                                type="text"
                                name="lastName"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input 
                                placeholder="Email"
                                type="email"
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <input 
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button>Sign Up</button>
                        <p>Already a member?  <a href="/signin">  Sign In</a></p>
                        
                    </form>
                </div>
        )            
    }

}

export default SignUp;