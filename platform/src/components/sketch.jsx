import React from 'react';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faPaintBrush } from '@fortawesome/fontawesome-free-solid';

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
            colors: ["red", "blue", "green", "yellow", "orange", "brown", "black"]
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.fillGrid = this.fillGrid.bind(this)
        this.updateColor = this.updateColor.bind(this)
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
            penX: e.clientX,
            penY: e.clientY
        })
    }

    updateColor(ind){
        this.setState({ cursorColor: this.state.colors[ind] })
    }

    getScreenShot(){
        html2canvas(document.getElementById("sketch")).then(canvas => console.log(canvas.toDataURL()))
    }

    render(){

        //allow to screenshot the shape into picture

        
        const size = this.state.squareSize
        const { width, height } = this.props;
        const { cursorColor, grid, penX, penY, colors } = this.state
        
        return (
            <div style={{  }}>
                <div 
                    style={{  cursor: "none", width: `${height}px`, height: `${width}px`, backgroundColor: '#F7F6F6'}} 
                    onMouseMove={(e) => this.handleMouseMove(e)}
                >
                    <div id="sketch" style={{position: 'relative', width: `${height}px`, height: `${width}px`,}}>
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
                    <div className="cursor-icon" style={{ position: 'absolute', top: `${penY }px`, left: `${penX}px`, borderRadius: '50%', width: '15px', height: '15px', backgroundColor: `${cursorColor}`, zIndex: 100}}>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
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
        )
    }
}