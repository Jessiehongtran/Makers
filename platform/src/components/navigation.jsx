import React from 'react';
import '../styles/navigation.scss';

class Nav extends React.Component {
    constructor(props){
        super(props)
        

    }

    render(){
        return (
            <div className="nav-frame">
                <h1 className="logo">Makers</h1>
                <div className="navigation">
                    <a href="/" className="nav-item">Explore</a>
                    {localStorage.getItem('token')
                    ? <a href="/myprojects" className="nav-item">My projects</a>
                    : <a href="/signup" className="nav-item">Sign up</a>
                    }
                </div>
                
            </div>
        )
    }



}

export default Nav;