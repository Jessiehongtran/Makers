import React from 'react';

export default class Loader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x: 47,
            y: 35,
            falling: true
        }
        this.up = this.up.bind(this)
        this.down = this.down.bind(this)
        this.move = this.move.bind(this)
    }

    componentDidMount(){
        this.move()
    }

    up(){
        let { y } = this.state
        y -= 5
        this.setState({ y: y })
    }

    down(){
        let { y } = this.state
        y += 5
        this.setState({ y: y })
    }

    move(){
        let { y, falling } = this.state;
        if (y > 90){
            falling = false
        }
        if (y < 35){
            falling = true
        }
        this.setState({ falling: falling })
        if (falling){
            this.down()
        } else {
            this.up()
        }
        setTimeout(this.move, 85)
    }

    render(){

        let { x, y } = this.state;
        

        return (
            <div  style={{ height: '300px', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ backgroundColor: '#FAAD9F', borderRadius: '50%', height: '80px', width: '80px', position: 'absolute', left: `${x}%`, top: `${y}%`,  transition: 'all 0.1s' }}></div>
            </div>
        )
    }
}