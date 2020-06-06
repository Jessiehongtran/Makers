import React from 'react';
import "../styles/create.scss";
import axios from 'axios';

class Create extends React.Component {
    constructor(){
        super();
        this.state = {
           project: {
              idea: "",
              project_name: "",
              category_id: "",
              other_category: "",
              target: "",
              impact: "",
              team: "",
              description: "",
           },
           categories: [],
           otherCateId: 0,
           projectId: 0,
           project_created: false,
           showOtherField: false,
           roleFieldHasComma: false,
           colorHex: "#e66465",
           colorRGB: {
               red: 228,
               green: 179,
               blue: 67
           },
           font: "",
           fontSize: 14,
        };

        this.submitProject =  this.submitProject.bind(this)
        
    }

    componentDidMount(){
        axios.get(`https://makers-app.herokuapp.com/api/category`)
             .then(res => {
                const cates = res.data
                cates.push({id: 0, category: "Others"})
                 this.setState({categories: cates})
             })
             .catch(err => {
                 console.log(err.message)
             })
    }

    updateProject(event){
        this.setState({project: {...this.state.project, [event.target.name]: event.target.value}})
    }

    roleHasComma(roleInput){
        for (var i =0; i < roleInput.length; i++){
            if (',' == roleInput[i]){
                return true
            }
        }

        return false
    }

    submitProject(e){
        e.preventDefault()

        //POST category if chose Others field
        if (this.state.showOtherField && this.state.project.other_category.length > 0){
            console.log('halo')
            const newCate = {
                category: this.state.project.other_category,
                count_projects: 0
            }
            console.log('newCate', newCate)
            axios.post(`https://makers-app.herokuapp.com/api/category`, newCate )
                 .then(res => {
                     console.log('supposed', res.data.id)
                     this.postProject(res.data.id)
                 })
                 .catch(err => {
                     console.log(err.message)
                 })

        }
        else {
            const cateId = parseInt(this.state.category_id)
            this.postProject(cateId)
        }

    }

    postProject(id){
        const projectToPost = {
            idea: this.state.project.idea,
            project_name: this.state.project.project_name,
            category_id: id,
            target_user: this.state.project.target,
            impact: this.state.project.impact,
            human_resources: this.state.project.team,
            join_count: 0,
            description: this.state.project.description,
            upvote: 0
        }
        console.log('projectToPost', projectToPost)

        //Post to project table
        axios.post(`https://makers-app.herokuapp.com/api/projects`, projectToPost)
            .then(res => {
                 console.log("posted successfully", res.data)
                 this.setState({projectId: res.data.id})
                 this.setState({project_created: true})

                 //Post to user_project table
                const userId = localStorage.getItem('userId')
                const projectHost = {
                    user_id: userId,
                    project_id: res.data.id,
                    is_host: true,
                    is_member: false
                }
                axios.post(`https://makers-app.herokuapp.com/api/user_project`, projectHost)
                    .then(res => {
                        console.log(res.data)
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            })
            .catch(err => {
                console.log(err.message)
            })
    }


    render(){

        console.log('category_di', this.state.project.category_id)

        if (this.state.project.category_id === "0"){
            this.state.showOtherField = true
        }

        return (
            <div className="create-frame">
                {this.state.project_created? 
                    <div class="created">
                        <h3 className="announce">Project created successfully</h3> 
                        <a href="/">back</a>
                    </div>
                : 
                <div className="info">
                    <h1>So what's on your mind?</h1>
                    <form onSubmit={e => this.submitProject(e)}>
                        <div className="name">
                            <input 
                                placeholder="Project name" 
                                name="project_name"
                                onChange={e => this.updateProject(e)}
                            />
                            <input 
                                placeholder="*What's your idea in short" 
                                name="idea"
                                required
                                onChange={e => this.updateProject(e)}
                            />
                        </div>
                        <div className="user">
                            <input 
                                placeholder="Target users" 
                                name="target"
                                onChange={e => this.updateProject(e)}
                            /> 
                            <input 
                                placeholder="Impact" 
                                name="impact"
                                onChange={e => this.updateProject(e)}
                            /> 
                        </div>
                        <div className="cate-team">
                            <select  
                                name="category_id"
                                className="cate"
                                onChange={e => this.updateProject(e)}>
                                <option>Select a category</option>
                                {this.state.categories.map(cate => 
                                    <option value={cate.id}>{cate.category}</option>
                                    )}

                            </select>
                            <input 
                                placeholder="Team includes" 
                                name="team"
                                onChange={e => this.updateProject(e)}
                               
                            />
                        </div>
                        { this.state.project.team.length > 1 && this.roleHasComma(this.state.project.team) === false ? <p className="role-remind">*Roles have to be separated by comma</p>: null}
                        {this.state.showOtherField ? 
                                <input
                                className="otherCate"
                                name="other_category"
                                placeholder="What's that other category?" 
                                onChange={e => this.updateProject(e)}
                                /> : null
                            }   

                        <div className="details">
                            <input 
                                className="more-details" 
                                placeholder="More details" 
                                name="description"
                                onChange={e => this.updateProject(e)}
                            />
                        </div>

                        

                        <button>
                                Create
                        </button>
                        {/* Lead to sign in/sign up/create profile */}
                    </form>
                </div>
                
                 } 
                
                
            </div>
        )
    }
}

export default Create;