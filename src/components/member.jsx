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
                    <img alt="avatar" style={{ width: '60px', height: '60px', borderRadius: '50%'}} src={member.profile_picture || "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"} />
                </div>
                <div style={{fontSize: '12px'}}>
                    {member.first_last_name}
                </div>
            </div>
        )
    }
}