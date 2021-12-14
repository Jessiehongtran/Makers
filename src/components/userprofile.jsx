import React from 'react';
import axios from 'axios';
import { API_URL } from '../APIconfig.js'

export default class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avatarUrl: ""
        }
        this.handleChangeUpload = this.handleChangeUpload.bind(this)
        this.enableReupload = this.enableReupload.bind(this)
    }

    handleChangeUpload(e){
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ avatarUrl: reader.result })
        }
        reader.readAsDataURL(file);
    }

    enableReupload(){
        this.setState({ avatarUrl: "" })
    }

    async postAvatarPicture(){
        const formData = new FormData();
        console.log('this.state.avatarUrl', this.state.avatarUrl)
        formData.append('file', this.state.avatarUrl)
        formData.append('upload_preset', 'ml_default')
        const cloudName='dfulxq7so'
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
            this.updateUserAvatar(response.data.url)
        } catch (err){
            console.log(err)
        }
    }

    async updateUserAvatar(url){
        const userId = localStorage.getItem('userId')
        try {
            await axios.patch(`${API_URL}/api/users/${userId}`, { profile_picture : url})
            this.props.history.go(-2);
        } catch (err){
            console.log(err.message)
        }
    }

    render(){

        const { avatarUrl } = this.state;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ width: '300px', height: '300px', border: '1px dashed grey', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    {avatarUrl.length > 0
                    ? < img alt="avatar" src={avatarUrl} style={{ width: '100%' }} />
                    : <input onChange={(e) => this.handleChangeUpload(e)} type="file" name="upload your photo" />
                    }
                </div>
                <div style={{ display: 'flex', marginTop: '20px'}}>
                    {avatarUrl.length > 0
                    ? <button onClick={() => this.enableReupload()} style={{ marginRight: '10px'}} >Reupload</button>
                    : null}
                    <button onClick={() => this.postAvatarPicture()}>Done</button>
                </div>
            </div>
        )
    }
}