import React from 'react';

class Comments extends React.Component {
    constructor(){
        super();
        this.state = {
            comment: "",
            comments: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({comment: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault()
        console.log(this.state.comment)
    }

   

    render(){
        console.log('comments', this.state.comment)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="comment here" onChange={this.handleChange}/>
                </form>
                <p>{this.state.comment}</p>
            </div>
        )
    }
}


export default Comments;