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
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '50px' }}>
                <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', border: '1px solid #DFE1E3', borderRadius: '50%' }}>{this.props.name[0].toUpperCase()}</div>
                <div style={{ marginTop: '-15px'}}>
                    <div style={{ fontSize: '10px', color: 'grey'}}>{this.props.name}</div>
                    <div style={{ position: 'relative'}}>
                        <div style={{ padding: '2px 10px', borderRadius: '6px', height: '35px', display: 'flex', alignItems: 'center', border: '1px solid #DFE1E3'}}>{this.props.comment}</div>
                        <button className="reply-btn" style={{ position: 'absolute', top: '85%', left: '10px'}}>Reply</button>
                    </div>
                </div>
            </div>
        )
    }


}