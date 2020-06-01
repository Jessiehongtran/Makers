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
           colorHex: "#e66465",
           colorRGB: {
               red: 228,
               green: 179,
               blue: 67
           },
           font: "",
           fontSize: 14,
        };
        
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

    submitProject(){
        //gather all project info and make a post request here

        var roleList = this.state.project.team

        console.log('roleList', roleList)
        const projectToPost = {
            idea: this.state.project.idea,
            project_name: this.state.project.project_name,
            banner_color: `#${this.fullColorHex(this.state.colorRGB.red, this.state.colorRGB.green, this.state.colorRGB.blue)}` || "#F5F4F4",
            category: this.state.project.category,
            target_user: this.state.project.target,
            impact: this.state.project.impact,
            human_resources: roleList,
            join_count: 0,
            description: this.state.project.description,
            upvote: 0
        }
        console.log('projectToPost', projectToPost)
        axios.post(`https://makers-app.herokuapp.com/api/projects`, projectToPost)
             .then(res => {
                 console.log("posted successfully", res.data)
             })
             .catch(err => {
                 console.log(err.message)
             })

        // alert("Project was created successfully!")
        this.props.history.push('/createProfile')
        
    }


    render(){

        const cates = ["Web dev", "Mobile", "Game dev", "Data science", "Machine learning"]

        return (
            <div className="create-frame">
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
                            {/* <input 
                                placeholder="Category" 
                                name="category"
                                onChange={e => this.updateProject(e)}
                            />  */}
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
                        <div className="showRoles">
                            Test
                        </div>

                        <div className="details">
                            <input 
                                className="more-details" 
                                placeholder="More details" 
                                name="description"
                                onChange={e => this.updateProject(e)}
                            />
                        </div>

                        

                        <button 
                            onClick={() => this.submitProject()}>
                                Create
                        </button>
                        {/* Lead to sign in/sign up/create profile */}
                    </form>
                </div>
                
            </div>
        )
    }
}

export default Create;