import React from 'react';
import '../styles/signUp.scss'
import axios from 'axios';
import { API_URL } from '../APIconfig'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: ""
            },
            authorized: false,
            errorMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(e){
        this.setState({user: {...this.state.user, [e.target.name]: e.target.value}})
    }

    handleSubmit(e){
        e.preventDefault()

        const user = {
            email: this.state.user.email.toLowerCase(),
            password: this.state.user.password
        }

        axios.post(`${API_URL}/api/users/login`, user)
             .then(res => {
                 this.setState({authorized: true})
                 localStorage.setItem('userId', res.data.id)
                 localStorage.setItem('token', res.data.token)
                 this.props.history.goBack()
             })
             .catch(err => {
                 this.setState({errorMessage: err.message})
             })
    }

    render(){

        const token = localStorage.getItem('token')
        if (token){
            this.props.history.goBack()
        }

        return (
            <div className="signUp">
                <img alt="signin icon" src="https://i.pinimg.com/originals/d8/22/b9/d822b94012d78d2a2eb5e448e8f2d5a5.png"/>
                
                    <form onSubmit={this.handleSubmit}>
                        <h3>Welcome back!</h3>
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
                        {this.state.errorMessage && !this.state.authorized ? <p className="errorMessage">*Invalid email or password</p> : null}
                        <button>Sign In</button>
                        <p>Not yet a member?  <a href="/signup">  Sign Up</a></p>
                        
                    </form>
                </div>
        )            
    }

}

export default SignUp;