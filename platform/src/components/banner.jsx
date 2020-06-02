import React from 'react';
import '../styles/banner.scss';

class Banner extends React.Component {
    constructor(props){
        super(props)
    }

    handleClick(){
        const token = localStorage.getItem('token')
        if (token){
            this.props.history.push('/create')
        }
        else {
            this.props.history.push('/signup') 
        }
    }

    render(){
        return (
            <div className="banner">
                <h1></h1>
                <h1></h1>
                <h3>Make projects happen</h3>
                <p>Makers is the pioneering community to connect people from all walks of life to do projects together</p>
                <button className="create-btn" onClick={() => this.handleClick()}>Create project</button>
                <h1></h1>
                <h1></h1>
            </div>
        )
    }
}

export default Banner;