import React from 'react';
import "../styles/create.scss"

class Create extends React.Component {
    constructor(){
        super();
        this.state = {
           
        };
    }


    render(){
        
        return (
            <div>
                <h1>So what's on your mind?</h1>
               <form>
                   <input placeholder="What's your idea in short"/>
                   {/* dropdown */}
                   <input placeholder="Category"/> 
                   <input placeholder="Target users"/> 
                   <input placeholder="Impact"/> 
                   <input placeholder="Team includes"/>
                   <input className="more-details" placeholder="More details"/>
                   <input placeholder="Your Linkedin Url"/>
                   <button onClick={() => {this.props.history.push('/createProfile')}}>Create</button>
                   {/* Lead to sign in/sign up/create profile */}
               </form>
            </div>
        )
    }
}

export default Create;