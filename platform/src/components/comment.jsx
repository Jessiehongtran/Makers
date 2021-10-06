import React from 'react';
import '../styles/comment.scss'

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{ display: 'flex',  fontSize: '14px', marginTop: '50px' }}>
                <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', border: '1px solid #DFE1E3', borderRadius: '50%' }}>{this.props.name[0].toUpperCase()}</div>
                <div style={{ marginTop: '-15px'}}>
                    <div style={{ fontSize: '10px', color: 'grey', marginLeft: '0px'}}>{this.props.name}</div>
                    <div style={{ position: 'relative'}} >
                        <div className="comment-text">{this.props.comment}</div>
                        <div className="reply">Reply</div>
                    </div>
                </div>
            </div>
        )
    }


}