import React from 'react';

export default class Text extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        return (
            <div style={{marginTop: '10px', height: '100%'}}>
                <textarea 
                    style={{ border: 'none', outline: 'none', width: '100%', padding: '10px 20px', height: '50vh', backgroundColor: "", resize: 'none'}}
                    className="idea-input" 
                    placeholder="..."
                    onChange={(e) => this.props.updateNewProject(this.props.tag, e.target.value)}
                ></textarea>
            </div>
        )
    }
}