import React from 'react';
import {IdeaData} from '../data/ideaData';
import Comments from '../components/comments';
import '../styles/join.scss';
import axios from 'axios';
import { API_URL } from '../APIconfig'

class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            userInfo : {
                identity: "",
                why: "",
                profileUrl: "",
                role: "",
            },
            category: "",
            countMembers: 0,
            member_submitted: false,
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
        const projectId = localStorage.getItem('ideaId')

        const member = {
            project_id: projectId,
            identity: this.state.userInfo.identity,
            why: this.state.userInfo.why,
            role: this.state.userInfo.role,
            profileUrl: this.state.userInfo.profileUrl
        }

        axios.post(`${API_URL}/api/members/`, member)
            .then(res => {
                console.log('member created', res.data)
                this.setState({member_submitted: true})

                axios.get(`${API_URL}/api/members/${projectId}`)
                    .then(res => {
                        console.log('get members', res.data)
                        this.setState({countMembers: res.data.length})

                        axios.patch(`${API_URL}/api/projects/edit/${projectId}`, {join_count: this.state.countMembers})
                            .then(res => {
                                console.log('update joinCount', res.data)
                                this.fetchProject(projectId)
                            })
                            .catch(err => {
                            console.log(err.message)
                        })
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
                
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    fetchProject(projectId){
        axios.get(`${API_URL}/api/projects/${projectId}`)
             .then(res => {
                 this.setState({project: res.data})
                 axios.get(`${API_URL}/api/category/${this.state.project.category_id}`)
                      .then(res => {
                          this.setState({category: res.data.category})
                      })
             })
             .catch(err => {
                 console.log(err)
             })
    }

    fetchComments(){
        const projectId = localStorage.getItem('ideaId')
        axios.get(`${API_URL}/api/comments/${projectId}`)
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
        const userId = localStorage.getItem('userId')

        const projectId = localStorage.getItem('ideaId')

        const comment_to_post = {
            user_id: userId,
            project_id: projectId,
            comment: this.state.comment
        }

        console.log(comment_to_post)
        
        axios.post(`${API_URL}/api/comments`, comment_to_post)
             .then(res => {
                 console.log('res in posting comment', res)
                 this.fetchComments()
             })
             .catch(err => {
                 console.log(err.message)
             })

        
    }
      


    render(){
        var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
        const avatar = this.state.avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTNWvAlntajQ9uki4_E508d7cB1qdQtc_UngZ2A5mJArKpontMT&usqp=CAU"

        const bannerColor = localStorage.getItem('bannerColor')

        const category = this.state.category || "Undefined category"

        var placeholderForComment = ""
        const token = localStorage.getItem('token')
        if (token){
            placeholderForComment = "leave a comment"
        }
        else {
            placeholderForComment = "Log in or Sign up to leave a comment"
        }


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
                                    >{this.state.project.project_name || "Unnamed"}</p>
                                    <p className="project-cate">{category}</p>
                                </div>
                                <div className="more-info">
                                    <p className="project-idea">{this.state.project.idea || "Undefined idea"}</p>
                                    <div className="project-impact">
                                        <i 
                                            class="fas fa-hand-holding-heart"
                                        ></i>
                                        <p>{this.state.project.impact || "Unspecified impact"}</p>
                                    </div>
                                    <div className="join-members">
                                        <i 
                                            class="fas fa-users"
                                        ></i>
                                        <p>{this.state.project.join_count} <span> interested</span></p>
                                    </div>
                                    <div className="roles">
                                        <div className="title">
                                            <i class="fas fa-user-tag"></i>
                                            <p><span>{roleList.length} </span>roles available</p>
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
                                {this.state.member_submitted? 
                                <h3>Thanks for your interest, host of this project will contact you.</h3>
                                : 
                                <>
                                <p>Who are you?</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                            placeholder="Intro" 
                                            name="identity" 
                                            onChange={this.handleChange}
                                    />
                                    <input 
                                        placeholder="Why you want to join this project" 
                                        name="why"
                                        onChange={this.handleChange}
                                    />
                                    <input 
                                        placeholder="Your Linkedin/Github" 
                                        name="profileUrl" 
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
                                </>
                                }
                                
                            </div>
                        </div>
                        <div className="expand-info">
                            <div className="thoughts">
                                <p>Thoughts</p>
                                <Comments /> 
                            </div>
                            <div className="members">
                                <p>Member List</p>
                            </div>
                            
                        </div>
                    </div>
                </>
        )

    }
}

export default Join;