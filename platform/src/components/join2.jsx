import React from 'react';
import '../styles/join2.scss';
import axios from 'axios';
import Member from './member';
import { API_URL } from '../APIconfig'

class Join2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            project: {},
            contributions: 0
        }
        this.fetchProject = this.fetchProject.bind(this)
        this.getContributions = this.getContributions.bind(this)
    }

    componentDidMount(){
        const projectId = localStorage.getItem('ideaId')
        this.fetchProject(projectId)
        this.getContributions()
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
            console.log('contributionList', contributionList, 'total', total)
            this.setState({contributions: total})
        } catch (err){
            console.log(err.message)
        }
    }


    render(){

        //bannerColor
        const bannerColor = localStorage.getItem('bannerColor')

        //category
        const category = this.state.category || "Undefined category"

        //roleList
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

        //member list
        let members = [
            {
                profile_pic: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918536/bobAva-dark_eyxtnd.svg",
                name: "Hong Tran"
            },
            {
                profile_pic: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918534/yangAva_m2zi3q.svg",
                name: "Kristal Lien"
            },
            {
                profile_pic: "https://res.cloudinary.com/dfulxq7so/image/upload/v1617918536/bobAva-dark_eyxtnd.svg",
                name: "Mike Han"
            }
        ]

        return (
            <div className="join-wrapper">
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
                        <div className="members">
                            <div className="members-intro">Who have joined</div>
                            <div className="members-list">
                                {members.map(eachMember => <Member member={eachMember}/> )}
                            </div>
                        </div>
                        <div className="join-action">
                            <div className="join-intro">Interested in joining?</div>
                            {/* Mail to host */}
                            <button className="email-btn">Email us</button>
                        </div>
                        <div className="progress">
                            <div className="progress-intro" style={{ marginBottom: '20px' }}>Project Progress</div>
                            <div className="progress-wrapper">
                                <div className="git" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <div className="icon" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src="github icon.png" style={{ width: '50px', marginBottom: '10px' }}/>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Join2;