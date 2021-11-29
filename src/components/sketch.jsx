import React from 'react';
import html2canvas from 'html2canvas';

export default class Sketch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            squareSize: 10,
            penX: 0,
            penY: 0,
            cursorColor: "#000",
            mouseDown: false,
            shoot: false,
            url: "",
            colors: ["red", "blue", "green", "yellow", "orange", "brown", "black"]
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.fillGrid = this.fillGrid.bind(this)
        this.updateColor = this.updateColor.bind(this)
        this.uploadImageToCloudinary = this.uploadImageToCloudinary.bind(this)
        this.enableEditSketch = this.enableEditSketch.bind(this)
    }

    componentDidMount(){
        this.fillGrid()
    }

    fillGrid(){
        const grid = []
        const size = this.state.squareSize

        const { width, height} = this.props;
        const rows = Math.round(width/size)
        const cols =  Math.round(height/size)
        let x = 0
        for (let r = 0; r < rows; r++){
            let row = []
            for (let c = 0; c < cols; c++ ){
                row.push({
                    id: x,
                    bgColor: '',
                    x: c*size,
                    y: r*size,
                })
                x+= 1
            }
            grid.push(row)
        }
        this.setState({ grid: grid})
    }



    handleMouseDown(){
       this.setState({mouseDown: true })
    }

    handleMouseUp(){
        this.setState({mouseDown: false })
    }

    uploadImageToCloudinary(imageUrl){

        console.log('imageUrl', imageUrl)

        const formData = new FormData();
        formData.append('file', imageUrl);
        formData.append('upload_preset', 'ml_default');
       
        const options = {
            method: 'POST',
            body: formData
        }

        return fetch('https://api.Cloudinary.com/v1_1/dchyongyd/image/upload', options)
                .then(res => res.json())
                .then(res => {
                    this.props.updateNewProject(this.props.tag, res.url, 'sketch')
                    this.setState({ 
                        shoot: true,
                        url: res.url
                    })
                })
                .catch(err => console.log(err))
    }

    handleMouseOver(squareId){
        if (this.state.mouseDown){
            const { grid } = this.state
            for (let r = 0; r < grid.length; r++){
                for (let c = 0; c < grid[0].length; c++){
                    if (grid[r][c].id === squareId){
                        grid[r][c].bgColor = this.state.cursorColor
                    }
                }
            }
            this.setState({ grid: grid })
        }
    }

    handleMouseMove(e){
        this.setState({
            penX: (e.clientX -500)/this.props.height*100,
            penY: (e.clientY -150)/this.props.width*100,
        })
    }

    updateColor(ind){
        this.setState({ cursorColor: this.state.colors[ind] })
    }

    getScreenShot(){
        const sketch = document.getElementById("sketch")
        html2canvas(sketch).then(canvas =>  {
                this.uploadImageToCloudinary(canvas.toDataURL())
            }
        )
    }

    enableEditSketch(){
        this.setState({ 
            shoot: false,
            url: ""
        })
    }

    relativeCoords(e){
        let bounds = e.target.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        return {x:x, y:y}
    }

    render(){

        //why moving mouse in small screen is not smooth?
        //why the mouse cursor does not appear the second time or third time I am sketching even thought it is still working, because penY is not correct, it does not get relative

        //update image into project and display in shortcut
        

        const size = this.state.squareSize
        const { width, height } = this.props;
        const { grid, colors, shoot, url } = this.state

        return (
            <div style={{ width: '100%' }}>
                {shoot 
                ? <div style={{ width: '100%' }}>
                    <img alt="sketch" src={url} style={{ width: '100%' }} />
                    <button onClick={() => this.enableEditSketch()}>Edit</button>
                  </div>
                : <div>
                    <div 
                        style={{  
                            // cursor: "none", 
                             height: `${width}px`, backgroundColor: '#F7F6F6',  width: '100%'}} 
                        onMouseMove={(e) => this.handleMouseMove(e)}
                    >
                        <div 
                            id="sketch" 
                            style={{position: 'relative', width: `${height}px`, height: `${width}px`}}
                        >
                        {grid.map(row => 
                            <div>
                                {row.map(col => <div 
                                        style={{ backgroundColor: `${col.bgColor}`, width: `${size}px`, height: `${size}px`, top: `${col.y}px`, left: `${col.x}px`, position: 'absolute'}}
                                        onMouseDown={() => this.handleMouseDown()}
                                        onMouseOver={() => this.handleMouseOver(col.id)}
                                        onMouseUp= {() => this.handleMouseUp()}
                                    ></div>)}
                            </div>)}
                        </div>
                        {/* <div className="cursor-icon" style={{ position: 'absolute', top: `${penY}%`, left: `${penX}%`, borderRadius: '50%', width: '15px', height: '15px', backgroundColor: `${cursorColor}`, zIndex: 100}}>
                        </div> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 20, }}>
                        <div className="colors" style={{width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                            {colors.map((color,i) => 
                                <div 
                                    style={{ width: '20px', height: '20px', backgroundColor: `${color}` }}
                                    onClick={() => this.updateColor(i)}
                                ></div>)}
                        </div>
                        <button onClick={() => this.getScreenShot()}>Save</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}