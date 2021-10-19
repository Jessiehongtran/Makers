import axios from 'axios';
import React from 'react';
import { API_URL } from '../APIconfig';
import '../styles/comment.scss'

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showReplyInput: false,
            reply: {
                subcomment: "",
                comment_ID: 0,
                user_ID: 0
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
                const res = await axios.get(`${API_URL}/api/subcomments/comment/${this.props.data.commentID}`)
                console.log('res in get subcomments', res.data)
                if (res.data.length > 0){
                    this.setState({subComments: res.data})
                }
            } catch (err){
                console.log(err.message)
            }
        }
    }

    async postSubComment(){
        try {
            //need a route for this, post the reply from state
            const res = await axios.post(`${API_URL}/api/subcomments`, this.state.reply)
            console.log(res.data)
            this.getSubComments()
            this.setState({showReplyInput: false})
        } catch (err){
            console.log(err.message)
        }
        
    }

    handleReply(){
        this.setState({showReplyInput: true})
    }

    handleChangeReply(e, commentID){
        this.setState({...this.state.reply,
            reply: {
                subcomment: e.target.value,
                comment_ID: commentID,
                user_ID: parseInt(this.props.userID)
            }
        })
    }

    handleSubmitReply(e){
        e.preventDefault()
        const userID = this.props.userID
        if (userID){
            this.postSubComment()
        } else {
            this.props.history.push('/signin')
        }
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
                        {/* {this.state.showReplyInput
                        ? <div style={{ marginLeft: '15px', marginTop: '20px', display: 'flex'}}>
                            <input className="sub-reply" placeholder="Add a reply" onChange={(e) => this.handleChangeReply(e, this.props.data.commentID)} />
                            <button className="sub-reply-btn" onClick={(e) => this.handleSubmitReply(e)}>Reply</button>
                          </div>
                        :  */}
                        <div>
                            <div className="reply" onClick={() => this.handleReply()}>Reply</div>
                            <div className="subcomments" style={{ marginLeft: '13px', marginTop: '7px' }}>
                                <div>
                                {this.state.subComments.length > 0
                                ? this.state.subComments.map(each => 
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: '35px', marginTop: '12px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', border: '1px solid #DFE1E3', borderRadius: '50%' }}>{each.first_last_name[0].toUpperCase()}</div>
                                        <div>
                                            <div style={{ fontSize: '10px', color: 'grey', marginLeft: '3px'}}>{each.first_last_name}</div>
                                            <div className="comment-text">
                                                {each.subcomment}
                                            </div>
                                        </div>
                                    </div>
                                )
                                : null}
                                {this.state.showReplyInput
                                    ? <div style={{ marginLeft: '15px', marginTop: '20px', display: 'flex'}}>
                                        <input className="sub-reply" placeholder="Add a reply" onChange={(e) => this.handleChangeReply(e, this.props.data.commentID)} />
                                        <button className="sub-reply-btn" onClick={(e) => this.handleSubmitReply(e)}>Reply</button>
                                    </div>
                                    : null}
                                </div>
                            </div>
                         </div>
                        {/* } */}
                    </div>
                </div>
            </div>
        )
    }


}