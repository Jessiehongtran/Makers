import React from 'react';
import '../styles/join2.scss';
import axios from 'axios';
import { API_URL } from '../APIconfig'

class Join2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: "",
            project: {}
        }
    }

    componentDidMount(){
        const projectId = localStorage.getItem('ideaId')
        this.fetchProject(projectId)
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

        return (
            <div>
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
                    </div>
                </div>
            </div>
        )
    }
}

export default Join2;