import React from 'react';

export default class Sketch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            grid: [],
            squareSize: 5,
            mouseDown: false
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseOver = this.handleMouseOver.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.fillGrid = this.fillGrid.bind(this)
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
                        grid[r][c].bgColor = '#000'
                    }
                }
            }
            this.setState({ grid: grid })
        }
    }

    render(){

        //divide the canvas into small squares and whenever onmousemove, pain it, 
        //allow to screenshot the shape into picture
        
        const size = this.state.squareSize
        const { width, height} = this.props;
        const { grid } = this.state
        
        return (
            <div style={{ position: 'relative', width: `${height}px`, height: `${width}px`, backgroundColor: '#F7F6F6'}} >
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
        )
    }
}