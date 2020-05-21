import React from 'react';
import "../styles/create.scss"

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


    render(){

        console.log('color state out', this.state.color)
        console.log('color RGB', this.fullColorHex(228,179,66))



        return (
            <div className="create-frame">
                <div className="info">
                    <h1>So what's on your mind?</h1>
                    <form>
                        <input 
                            placeholder="What's your idea in short" 
                            name="idea"
                            onChange={e => this.updateProject(e)}
                        />
                        <input 
                            placeholder="Find for it a name" 
                            name="project_name"
                            onChange={e => this.updateProject(e)}
                        />
                        {/* dropdown for category */}
                        <input 
                            placeholder="Category" 
                            name="category"
                            onChange={e => this.updateProject(e)}
                        /> 
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
                        <input 
                            placeholder="Team includes" 
                            name="team"
                            onChange={e => this.updateProject(e)}
                        />
                        <input 
                            className="more-details" 
                            placeholder="More details" 
                            name="description"
                            onChange={e => this.updateProject(e)}
                        />
                        <button 
                            onClick={() => {this.props.history.push('/createProfile')}}>
                                Create
                        </button>
                        {/* Lead to sign in/sign up/create profile */}
                    </form>
                </div>
                <div className="display">
                    {/* Using color picker input, colorhex */}
                    {/* <div className="display-container" style={{backgroundColor: this.state.colorHex }}>                      
                        {this.state.color}
                    </div>
                    <div className="display-color-picker">
                        <input name="Color Picker" type="color" value="#e66465" onChange={e => this.colorChange(e)}/>
                    </div>
                    <p>---------</p> */}

                    {/* Using RGB */}
                    <div 
                        className="display-container" 
                        style={{
                            backgroundColor: `#${this.fullColorHex(this.state.colorRGB.red, this.state.colorRGB.green, this.state.colorRGB.blue)}`,
                            fontFamily: this.state.font,
                            fontSize: this.state.fontSize,
                        }}>                      
                            {this.state.project.idea}
                    </div>
                    <div className="display-color-picker">
                        <form>
                            <label>
                                Red
                                <br/>0 <input type="number" name="red" onChange={e => this.handleColorChange(e)}/> 255
                            </label>
                            <label>
                                Green
                                <br/>0 <input type="number" name="green" onChange={e => this.handleColorChange(e)}/> 255
                            </label>
                            <label>
                                Blue
                                <br/>0 <input type="number" name="blue" onChange={e => this.handleColorChange(e)}/> 255
                            </label>
                        </form>
                    </div>
                    <div className="display-font-picker">
                        <select name="font" onchange={e => this.updateFont(e)}>
                            <option value="Serif"> Serif </option>
                            <option value="Arial"> Arial </option>
                            <option value="Sans-Serif"> Sans-Serif </option>                                  
                            <option value="Tahoma"> Tahoma </option>
                            <option value="Verdana"> Verdana </option>
                            <option value="Lucida Sans Unicode"> Lucida Sans Unicode </option>
                            <option value="'Times New Roman', Times, serif"> Times New Roman </option>    
                            <option value="Helvetica"> Helvetica </option> 
                            <option value="Verdana"> Verdana </option> 
                            <option value="Garamond"> Garamond </option>  
                            <option value="Courier"> Courier </option>    
                            <option value="'Georgia', serif"> Georgia </option> 
                            <option value="Palatino"> Palatino </option>
                            <option value="Impact"> Impact </option> 
                            <option value="Candara"> Candara </option>   
                            <option value="Optima"> Optima </option> 
                            <option value="Perpetua"> Perpetua </option> 
                            <option value="Trebuchet MS"> Trebuchet MS </option> 
                            <option value="Comic Sans"> Comic Sans </option>                               
                        </select>
                    </div>
                    <div className="display-fontSize-picker">
                        Adjust font size
                        <button onClick={() => this.updateFontSize("down")}>-</button>
                        {this.state.fontSize}
                        <button onClick={() => this.updateFontSize("up")}>+</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Create;