import React from 'react';

export default class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '15px' }}>
                <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px', border: '1px solid #DFE1E3', borderRadius: '50%' }}>{this.props.name[0].toUpperCase()}</div>
                <div style={{ padding: '2px 10px', borderRadius: '6px', height: '35px', display: 'flex', alignItems: 'center', border: '1px solid #DFE1E3'}}>{this.props.comment}</div>
            </div>
        )
    }


}