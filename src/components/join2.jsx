import React from 'react';
import '../styles/join2.scss';
import axios from 'axios';
import Member from './member';
import { API_URL } from '../APIconfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import Comment from './comment';

class Join2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            project: {},
            contributions: 0,
            comment: "",
            commentList: [],
            user: {},
            members: [],
            showIdeaAsImage: true
        }
        this.fetchProject = this.fetchProject.bind(this)
        this.getContributions = this.getContributions.bind(this)
        this.handleChangeComment = this.handleChangeComment.bind(this)
        this.handleSubmitComment = this.handleSubmitComment.bind(this)
        this.getUserbyUserID = this.getUserbyUserID.bind(this)
        this.handleKey = this.handleKey.bind(this)
        this.checkImageError = this.checkImageError.bind(this)
    }

    componentDidMount(){
        const projectId = localStorage.getItem('ideaId')
        this.fetchProject(projectId)
        this.getContributions()
        this.getUserbyUserID()
        this.getCommentsOfAProject()
        this.getMembersOfProject(projectId)
     }

    async getUserbyUserID(){
        const userID = localStorage.getItem('userId')
        if (userID){
            try {
                const response = await axios.get(`${API_URL}/api/users/${userID}`)
                this.setState({user: response.data})
            } catch(err){
                console.log(err.message)
            }
        }
    }

    async postCommentForAProject(){
        const projectId = localStorage.getItem('ideaId')
        const userID = localStorage.getItem('userId')
        if (projectId && userID && this.state.comment.length > 0){
            const newComment = {
                user_id: parseInt(userID),
                project_id: parseInt(projectId),
                comment: this.state.comment,
                created_at: new Date().getTime()
            }
            try {
                await axios.post(`${API_URL}/api/comments`, newComment)
                this.getCommentsOfAProject()
            } catch (err){
                console.log(err.message)
            }
        }
    }

    async getCommentsOfAProject(){
        const projectId = localStorage.getItem('ideaId')
        if (projectId){
            try {
                const comments = await axios.get(`${API_URL}/api/comments/${projectId}`)
                this.setState({commentList: comments.data})
            } catch (err){
                console.log(err.message)
            }
        }
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

    async getContributions(){
        let owner = "Jessiehongtran"
        let projectGitName = "Makers"
        try {
            const res = await axios.get(`https://api.github.com/repos/${owner}/${projectGitName}/contributors`)
            let total = 0
            const contributionList = res.data
            for (let i = 0; i < contributionList.length; i++){
                total += contributionList[i].contributions
            }
            this.setState({contributions: total})
        } catch (err){
            console.log(err.message)
        }
    }

    async getMembersOfProject(projectId){
        try {
            const response = await axios.get(`${API_URL}/api/user_project/${projectId}/people`)
            this.setState({ members: response.data })
        } catch (err){
            console.log(err.message)
        }
    }

    handleChangeComment(e){
        localStorage.getItem('userId')
        this.setState({ comment: e.target.value })
    }

    handleSubmitComment(e){
        e.preventDefault()
        const userID = localStorage.getItem('userId')
        if (userID){
            this.postCommentForAProject()
        } else {
            this.props.history.push('/signin')
        }
    }

    handleKey(e){
        if (e.key === "Enter"){
            this.handleSubmitComment(e)
        }
    }

    checkImageError(){
        console.log('checking image error')
        this.setState({ showIdeaAsImage: false })
    }

    render(){

        const { showIdeaAsImage } = this.state;

        //Things to do:
        //User should be able to create a profile/update avatar

        //bannerColor
        const bannerColor = localStorage.getItem('bannerColor')

        //category
        const category = this.state.category || "Undefined category"

        //roleList
        const roles = `${this.state.project.human_resources }`

        var j = 0
        const roleList = []
        for (var i =0; i< roles.length; i++){
            if (roles[i]=== "," && j < roles.length){
                roleList.push(roles.slice(j,i))
                j = i+ 1
            }

            else if (i === roles.length - 1){
                roleList.push(roles.slice(j,roles.length))
            }
        }

        const { commentList, members } = this.state;


        return (
            <div className="join-wrapper">
                <div className="join">
                    <div className="info">
                        <div className="project-info">
                            <div className="name-cate">
                                { showIdeaAsImage
                                ? <img onError={this.checkImageError}  alt="idea" src={this.state.project.idea} style={{ width: '400px'}} /> 
                                : <p 
                                    className="project-name"
                                    style={{
                                        backgroundColor: bannerColor
                                    }}
                                >{this.state.project.project_name || "Unnamed"}</p>
                                }
                                <p className="project-cate">{category}</p>
                            </div>
                            <div className="more-info">
                                { <img alt="idea" src={this.state.project.idea} /> ? null : <p className="project-idea">{this.state.project.idea || "Undefined idea"}</p>}
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
                        <div className="members">
                            <div className="members-intro">Who have joined</div>
                            <div className="members-list">
                                {members.map(eachMember => <Member member={eachMember}/> )}
                            </div>
                        </div>
                        <div className="join-action">
                            <div className="join-intro">Interested in joining?</div>
                            {/* Mail to host */}
                            <button className="email-btn"><a href="mailto:hongjtran@gmail.com">Email us</a></button>
                        </div>
                        <div className="progress">
                            <div className="progress-intro" style={{ marginBottom: '20px' }}>Project Progress</div>
                            <div className="progress-wrapper">
                                <div className="git" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div className="icon" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img alt="github icon" src="github icon.png" style={{ width: '50px', marginBottom: '10px' }}/>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px'}}>
                                        <div className="number">
                                            {this.state.contributions}
                                        </div>
                                        <div style={{marginLeft: '5px'}}>
                                            contributions
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="thoughts">
                                <div className="">Thoughts</div>
                                <div className="row">
                                    <input className="thought-input" onChange={(e) => this.handleChangeComment(e)}  onKeyPress={(e) => this.handleKey(e)}/>
                                    <FontAwesomeIcon className="thought-submit" icon={faPaperPlane} onClick={(e) => this.handleSubmitComment(e)} />
                                </div>
                                <div className="thoughts-timeline">
                                    {commentList.length > 0
                                    ? commentList.map(each => <Comment data={each} userID={localStorage.getItem('userId')} history={this.props.history} />)
                                    : null}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Join2;