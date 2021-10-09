import React from 'react';
import '../styles/comment.scss'

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showReplyInput: false,
            reply: {
                subcomment: "",
                comment_ID: 0,
                user_ID: this.props.userID
            },
            subComments: []

        }
        this.handleReply = this.handleReply.bind(this)
        this.handleChangeReply = this.handleChangeReply.bind(this)
        this.handleSubmitReply = this.handleSubmitReply.bind(this)
    }

    componentDidMount(){
        this.getSubComments()
    }

    async getSubComments(){
        if (this.props.data.commentID){
            try {   
                //need a route for this
            } catch (err){
                console.log(err.message)
            }
        }
    }

    async postSubComment(){
        if (this.props.data.commentID){
            try {
                //need a route for this, post the reply from state
                this.getSubComments()
            } catch (err){
                console.log(err.message)
            }
        }
    }

    handleReply(){
        this.setState({showReplyInput: true})
    }

    handleChangeReply(e, commentID){
        this.setState({
            reply: {
                subcomment: e.target.value,
                comment_ID: commentID
            }
        })
    }

    handleSubmitReply(e){
        e.preventDefault()
        this.postSubComment()
    }

    render(){

        console.log('props in comment', this.props)

        return (
            <div style={{ display: 'flex',  fontSize: '14px', marginTop: '25px' }}>
                <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', border: '1px solid #DFE1E3', borderRadius: '50%' }}>{this.props.data.first_last_name[0].toUpperCase()}</div>
                <div style={{ marginTop: '-15px'}}>
                    <div style={{ fontSize: '10px', color: 'grey', marginLeft: '3px'}}>{this.props.data.first_last_name}</div>
                    <div style={{ position: 'relative'}} >
                        <div className="comment-text">{this.props.data.comment}</div>        
                        {this.state.showReplyInput
                        ? <div style={{ marginLeft: '15px', marginTop: '20px', display: 'flex'}}>
                            <input className="sub-reply" placeholder="Add a reply" onChange={(e) => this.handleChangeReply(e, this.props.data.commentID)} />
                            <button className="sub-reply-btn" onClick={(e) => this.handleSubmitReply()}>Reply</button>
                          </div>
                        : <div className="reply" onClick={() => this.handleReply()}>Reply</div>}
                    </div>
                </div>
            </div>
        )
    }


}