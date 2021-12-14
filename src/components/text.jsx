import React from 'react';
import '../styles/sketchtext.scss';

export default class Text extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            done: false
        }
        this.doneTexting = this.doneTexting.bind(this)
    }

    doneTexting(){
        this.setState({ done: true })
    }

    editTexting(){
        this.setState({ done: false })
    }


    render(){
        
        const { done } = this.state;

        //save text and update to project

        //there is a problem with text project update]

        return (
            <div style={{ marginTop: '10px', height: '100%', width: '100%' }}>
                { done
                ? <div>
                    <div>{this.props.new_project[this.props.tag]}</div>
                    <button className="btn"  onClick={() => this.editTexting()}>Edit</button>
                  </div>
                : <div>
                    <textarea 
                        style={{ border: 'none', outline: 'none', width: '100%', padding: '10px 20px', height: '60vh', backgroundColor: "", resize: 'none'}}
                        className="idea-input" 
                        placeholder={this.props.placeholder}
                        onChange={(e) => {
                            console.log('texttt', e.target.value)
                            this.props.updateNewProject(this.props.tag, e.target.value, 'text') }}
                    ></textarea>
                    <button className="btn"  onClick={() => this.doneTexting()}>Save</button>
                  </div>}
            </div>
        )
    }
}