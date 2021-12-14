import React from 'react';
import '../styles/signUp.scss'
import axios from 'axios';
import { API_URL } from '../APIconfig'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            emailIsUnique: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e){
        this.setState({emailIsUnique: true})
        this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    isUnique(email){
        
        axios.get(`${API_URL}/api/users`)
             .then(res => {
                 for (var i =0; i <res.data.length; i++){
                     if (res.data[i].email.toLowerCase() === email.toLowerCase()){
                         this.setState({emailIsUnique: false})
                     }
                 }
             })
    }

    handleSubmit(e){
        e.preventDefault()

        //make a post request to submit user
        const userToPost = {
            first_last_name : this.state.user.firstName + " " + this.state.user.lastName,
            email: this.state.user.email.toLowerCase(),
            password: this.state.user.password
        }

        axios.post(`${API_URL}/api/users`, userToPost)
             .then(res => {
                 localStorage.setItem('userId', res.data.id)
                 localStorage.setItem('token', res.data.token)
                 this.props.history.push('/profile')
             })
             .catch(err => {
                 console.log(err.message)
             })
        
    }

    render(){

        const token = localStorage.getItem('token')
        if (token){
            this.props.history.goBack()
        }

        this.isUnique(this.state.user.email)

        return (
            <div className="signUp">
                <img alt="signup icon" src="https://i.pinimg.com/originals/d8/22/b9/d822b94012d78d2a2eb5e448e8f2d5a5.png"/>
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
                        {this.state.emailIsUnique === false ? <p className="email-taken">*Email was already taken</p> : null}
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