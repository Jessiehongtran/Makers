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
                    <a href="/">Explore</a>
                    {localStorage.getItem('token')
                    ? <a href="/myprojects">My projects</a>
                    : <a href="/signup">My projects</a>
                    }
                </div>
                
            </div>
        )
    }



}

export default Nav;