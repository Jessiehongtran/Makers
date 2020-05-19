import React from 'react';
import {IdeaData} from '../data/ideaData';
import axios from 'axios';
import '../styles/join.scss'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            userInfo : {
                name: "",
                identity: "",
                valueAdded: "",
                role: "",
                linkedin: ""
            },
            value: '',
            comment: '',
            avatar: '',
            comments: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      }
    
    handleChange(event) {
        this.setState({userInfo:{...this.state.userInfo,[event.target.name]: event.target.value}});
      }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log('submitted: ',  this.state.userInfo);
      }

    fetchProject(projectId){
        axios.get(`https://makers-app.herokuapp.com/api/projects/${projectId}`)
             .then(res => {
                 this.setState({project: res.data})
             })
             .catch(err => {
                 console.log(err)
             })
    }

    fetchComments(){
        const projectId = localStorage.getItem('ideaId')
        axios.get(`https://makers-app.herokuapp.com/api/comments/${projectId}`)
             .then(res => {
                 let arr = res.data
                 for (let i = 0; i < (arr.length/2); i++){
                    let el = arr[i]
                    arr[i] = arr[arr.length-1-i]
                    arr[arr.length-1-i] = el
                 }
                 this.setState({comments: arr})
             })
             .catch(err => {
                 console.log(err)
             })
    }

    componentDidMount(){
       const projectId = localStorage.getItem('ideaId')
       this.fetchProject(projectId)
       this.fetchComments()
    }

    handleComment(event){
        console.log('in handleComment', event.target.value)
        this.setState({comment: event.target.value})
    }

    handleCommentSubmit(event){
        event.preventDefault();
        //with current architecture, have to make sure a user exists before posting a comment
        //seed a user and give it id to 1 is a way to trick for anonymous
        var userId = 1
        if (this.state.avatar.length > 0){
            userId = localStorage.getItem('userId')
        }
        const projectId = localStorage.getItem('ideaId')

        const comment_to_post = {
            user_id: userId,
            project_id: projectId,
            comment: this.state.comment
        }
        
        axios.post('https://makers-app.herokuapp.com/api/comments', comment_to_post)
             .then(res => {
                 console.log('res in posting comment', res)
                 this.fetchComments()
             })
             .catch(err => {
                 console.log(err.message)
             })
    }
      


    render(){
        console.log('userInfo', this.state.userInfo)
        var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
        const avatar = this.state.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNWvAlntajQ9uki4_E508d7cB1qdQtc_UngZ2A5mJArKpontMT&usqp=CAU"
        const profileImages = [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSFD1Ofi7-DsfgVE7CojIqMuNGYEN1N4dGyec3hJQebtISancyF&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMl6NTlCzCCbsGYUM6UL20gHLtNf78lW8BjVl4a1EeQDoSlSQS&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdYFX7Pl4vLFV83iJ5MUsDCpMC6AABe98QoiIjArq_upOhRKfa&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSTEqJ07Y1GCvnoWd76ffZwIyKleI2Y-UZrWrfxgldtXzyy1YU8&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcShGctjfurkFe-BYgtExvOCLH_JzgHucN2-X7F2Y431nicgcfPW&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQJo3Fn6BEXivjOV5TmZpRwLg_fznF876zunwRez-CKba0EEdoP&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdvsUvxV4_gkBisReH_2b-b-aPONPGVODQ08g6byuz4DV1q7sy&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSli_BLm0Wgk5nIjJipTJYeBrRjgzKMASnlKBTlhP1AUkOn3yfM&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZjIBeDa-waFYq5olrYXtyhM3WBZ_nAmgBTUkvLTzVyDlr5wGX&usqp=CAU"
        ]

        const randomInd = Math.floor(Math.random()*profileImages.length)

        const tempAvatar = profileImages[randomInd]
        
        return (
                    <div className="join">
                        <p><span className="title">Project:</span><span style={{color: `#${titleRandomColor}`, fontWeight: 'bold', fontSize: '20px'}}> {this.state.project.project_name}</span></p>
                        <div className="info">
                            <div className="project-info">
                                    <p><span className="title">Category: </span><span className="text"> {this.state.project.category}</span></p>
                                    <p><span className="title">Target users:</span>  <span className="text">{this.state.project.target_user}</span></p>
                                    <p><span className="title">Impact:</span> <span className="text">{this.state.project.impact}</span></p>
                                    <p><span className="title">Team: </span> <span className="text">{this.state.project.human_resources}</span></p>
                                    {/* <p><span className="title">Host: </span> <span className="text">{IdeaData[i].host}</span></p> */}
                                    <p><span className="title">Joined members: </span> <span className="text">{this.state.project.join_count}</span></p>
                            </div>
                            <div className="member-info">
                                <p>Give us an idea about you</p>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <input 
                                            type="text" 
                                            placeholder="Your name" 
                                            name="name"
                                            onChange={this.handleChange} 
                                        />
                                    </label>
                                    <label>
                                        Who you are?
                                        <input 
                                            placeholder="I am" 
                                            name="identity" 
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label>
                                        What can you bring to the table?
                                        <input 
                                            placeholder="I can" 
                                            name="valueAdded"
                                            onChange={this.handleChange}
                                        />
                                    </label>
                                    <label>
                                        Select your role: <select  
                                            name="role"
                                            onChange={this.handleChange}>
                                            <option value="teamLead">Team Lead</option>
                                            <option value="frontEnd">Front End</option>
                                            <option value="backEnd">Back End</option>
                                            <option value="ux">UX/UI</option>
                                        </select>
                                    </label>
                                    <input 
                                        placeholder="Your Linkedin Url" 
                                        name="linkedin"
                                        onChange={this.handleChange}
                                    />
                                    <button type="submit">Ask to join</button>
                                </form>
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="thoughts">
                                <p>Thoughts</p>
                                <form>
                                    <img className="avatar" src={avatar}/>
                                    <input 
                                        type="text" 
                                        onChange={this.handleComment}
                                    />
                                    <button type="submit" onClick={this.handleCommentSubmit}>Send</button>
                                </form>
                                <div className="showComments">
                                {this.state.comments.map(each => 
                                    <div className="each-comment">
                                        <img className="avatar" src={tempAvatar}/>
                                        <p>{each.comment}</p>
                                    </div>
                                )}
                                
                                </div>
                                
                                {/* <img src="https://qph.fs.quoracdn.net/main-qimg-3234084c90912949b3136194769ebd72"/> */}
                            </div>
                            <div className="members">
                                <p>Member List</p>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Join;