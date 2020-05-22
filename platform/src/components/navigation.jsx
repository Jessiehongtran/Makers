import React from 'react';
import '../styles/navigation.scss';

class Nav extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return (
            <div className="nav-frame">
                {/* <h1><span style={{color: `#${randomColor0}`}}>#</span><span style={{color: `#${randomColor1}`}} >M</span><span style={{color: `#${randomColor2}`}} >a</span><span style={{color: `#${randomColor3}`}}>k</span><span style={{color: `#${randomColor4}`}}>e</span><span style={{color: `#${randomColor5}`}}>r</span><span style={{color: `#${randomColor6}`}}>s</span></h1>
                  <p className="quote">"Eventually, it matters more <span style={{color: `red`}}>what you can do</span> than what what you know."</p>
                  <p className="quote">Why not learning by doing?</p>
                  <p className="note">This platform is created to connect people from all walks of life to make something meaningful together so hook up!</p>
               */}
                <h1 className="logo">Makers</h1>
                <div className="navigation">
                    <a>Explore</a>
                    <a>Your projects</a>
                </div>
                
            </div>
        )
    }



}

export default Nav;