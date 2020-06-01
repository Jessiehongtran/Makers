import React from 'react';
// import {IdeaData} from '../data/ideaData';
import axios from 'axios';
import '../styles/join.scss';
import Nav from '../components/navigation'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            userInfo : {
                name: "",
                identity: "",
                role: "",
                linkedin: "",
                github: ""
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

        localStorage.setItem('name', this.state.userInfo.name)
        localStorage.setItem('intro', this.state.userInfo.identity)
        localStorage.setItem('role', this.state.userInfo.role)
        localStorage.setItem('linkedin', this.state.userInfo.linkedin)
        localStorage.setItem('github', this.state.userInfo.github)
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
        console.log('project in Join', this.state.project)
        console.log('HR', `1 ${this.state.project.human_resources}` )
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

        const bannerColor = localStorage.getItem('bannerColor')

        const category = "Web dev"

        // const roleList = ["Software engineers", "Product managers", "Backend"]



        // turn string of roles into an array
        const roles = `${this.state.project.human_resources }`

        var j = 0
        const roleList = []
        for (var i =0; i< roles.length; i++){
            if (roles[i]== "," && j < roles.length){
                roleList.push(roles.slice(j,i))
                j = i+ 1
            }

            else if (i === roles.length - 1){
                roleList.push(roles.slice(j,roles.length))
            }
        }
        
        return (
            <>
                    
                    <div className="join">
                        <div className="info">
                            <div className="project-info">
                                <div className="name-cate">
                                    <p 
                                        className="project-name"
                                        style={{
                                            backgroundColor: bannerColor
                                        }}
                                    >{this.state.project.project_name}</p>
                                    <p className="project-cate">{category}</p>
                                </div>
                                <div className="more-info">
                                    <p className="project-idea">{this.state.project.idea}</p>
                                    <div className="project-impact">
                                        <i 
                                            class="fas fa-hand-holding-heart"
                                        ></i>
                                        <p>{this.state.project.impact}</p>
                                    </div>
                                    <div className="join-members">
                                        <i 
                                            class="fas fa-users"
                                        ></i>
                                        <p>{this.state.project.join_count} <span> members</span></p>
                                    </div>
                                    <div className="roles">
                                        <div className="title">
                                            <i class="fas fa-user-tag"></i>
                                            <p>Roles available</p>
                                        </div>
                                        <div class="list-role">
                                            {roleList.map(role => 
                                                <p 
                                                className="each-role"
                                                style={{
                                                backgroundColor: bannerColor
                                                }}
                                                >{role}</p>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="member-info">
                                <p>Who are you?</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                            type="text" 
                                            placeholder="Name"
                                            name="name"
                                            onChange={this.handleChange} 
                                    />
                                    <input 
                                            placeholder="Intro" 
                                            name="identity" 
                                            onChange={this.handleChange}
                                    />
                                    <input 
                                        placeholder="Linkedin" 
                                        name="linkedin" 
                                        onChange={this.handleChange}
                                    />
                                    <input 
                                        placeholder="Github" 
                                        name="github"
                                        onChange={this.handleChange}
                                    />
                                    
                                   <select  
                                            name="role"
                                            className="select-css"
                                            onChange={this.handleChange}>
                                            <option>Select your role</option>
                                            {roleList.map(role => 
                                                <option value={role}>{role}</option>
                                               )}
        
                                    </select>
                                 
                                    
                                    <button type="submit">Ask to join</button>
                                </form>
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="thoughts">
                                <p className="title">Thoughts</p>
                                <form>
                                    {/* <img className="avatar" src={avatar}/> */}
                                    <input 
                                        type="text" 
                                        onChange={this.handleComment}
                                        placeholder="leave a comment"
                                    />
                                    <i class="fas fa-paper-plane" onClick={this.handleCommentSubmit}></i>
                                </form>
                                <div className="showComments">
                                {this.state.comments.map(each => 
                                    <div className="each-comment">
                                        <img className="avatar" src={tempAvatar}/>
                                        <p className="comment-container">{each.comment}</p>
                                    </div>
                                )}
                                
                                </div>
                                
                                {/* <img src="https://qph.fs.quoracdn.net/main-qimg-3234084c90912949b3136194769ebd72"/> */}
                            </div>
                            {/* <div className="members">
                                <p>Member List</p>
                            </div> */}
                        </div>
                    </div>
                </>
        )

    }
}

export default Join;