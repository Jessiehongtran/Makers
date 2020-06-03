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
              category: "",
              target: "",
              impact: "",
              team: "",
              description: "",
           },
           projectId: 0,
           project_created: false,
           showOtherField: false,
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

    updateProject(event){
        this.setState({project: {...this.state.project, [event.target.name]: event.target.value}})
    }

    colorChange(event){
        alert("are you sure you want this color?")
        console.log('color', event.target.value)
        this.setState({colorHex: event.target.value})
    }


    handleColorChange(event){
        this.setState({colorRGB: {...this.state.colorRGB, [event.target.name]: event.target.value}})
    }

    rgbToHex(rgb) { 
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex = "0" + hex;
        }
        return hex;
      };

    fullColorHex(r,g,b) { 
        var red = this.rgbToHex(r); 
        var green = this.rgbToHex(g); 
        var blue = this.rgbToHex(b); 
        return red+green+blue; 
    }

    updateFont(event){
        this.setState({font: event.target.value})
    }

    updateFontSize(toDo){
        if (toDo === "down"){
            var newfontSize = this.state.fontSize - 1
            this.setState({fontSize: newfontSize})
        }
        else if (toDo === "up"){
            var newfontSize = this.state.fontSize + 1
            this.setState({fontSize: newfontSize})
        }
    }

    submitProject(e){
        e.preventDefault()
        var roleList = this.state.project.team

        console.log('roleList', roleList)
        const projectToPost = {
            idea: this.state.project.idea,
            project_name: this.state.project.project_name,
            category: this.state.project.category,
            target_user: this.state.project.target,
            impact: this.state.project.impact,
            human_resources: roleList,
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
             })
             .catch(err => {
                 console.log(err.message)
             })
        

        //Post to user_project table
        const userId = localStorage.getItem('userId')

        console.log('userId', userId)
        console.log('projectId', this.state.projectId)
        const projectHost = {
            user_id: userId,
            project_id: this.state.projectId,
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

    }


    render(){

        const cates = ["Web dev", "Mobile", "Game dev", "Data science", "Machine learning", "Others"]

        if (this.state.project.category === "Others"){
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
                    <form>
                        <div className="name">
                            <input 
                                placeholder="Project name" 
                                name="project_name"
                                onChange={e => this.updateProject(e)}
                            />
                            <input 
                                placeholder="What's your idea in short" 
                                name="idea"
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
                                name="category"
                                className="cate"
                                onChange={e => this.updateProject(e)}>
                                <option>Select a category</option>
                                {cates.map(cate => 
                                    <option value={cate}>{cate}</option>
                                    )}

                            </select>


                            <input 
                                placeholder="Team includes" 
                                name="team"
                                onChange={e => this.updateProject(e)}
                               
                            />
                        </div>
                       
                        {this.state.showOtherField ? 
                                <input
                                className="otherCate"
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

                        

                        <button 
                            onClick={e => this.submitProject(e)}>
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