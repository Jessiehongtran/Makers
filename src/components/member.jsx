import React from 'react';

export default class Member extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){

        const { member } = this.props;

        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px'}}>
                <div style={{  marginBottom: '5px'}}>
                    <img style={{ width: '60px', height: '60px', borderRadius: '50%'}} src={member.profile_pic} />
                </div>
                <div style={{fontSize: '12px'}}>
                    {member.name}
                </div>
            </div>
        )
    }
}