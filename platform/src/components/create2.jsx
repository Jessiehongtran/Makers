import React from 'react';
import '../styles/create2.scss';
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faPaintBrush } from '@fortawesome/fontawesome-free-solid';
import Text from './text';
import Sketch from './sketch'

export default class Create2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            action: <Text />
        }

        this.switchPlatform = this.switchPlatform.bind(this)

    }

    switchPlatform(command){
        if (command === "text"){
            this.setState({ action: <Text />})
        }
        if (command === "sketch"){
            this.setState({ action: <Sketch />})
        }
    }

    render(){
        return (
            <div style={{width: '100%', minHeight: '100vh', display: 'flex', flexWrap: 'wrap', padding: '20px 100px'}}>
                <div className="piece" >
                    <div className="info">
                        <div className="title">IDEA</div>
                        <div className="icons">
                            <div className="icon pencil" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="icon paint">
                                <FontAwesomeIcon icon={faPaintBrush}  onClick={() => this.switchPlatform('sketch')}/>
                            </div>
                        </div>
                    </div>
                    <div className="space">
                        {this.state.action}
                    </div>
                </div>
                <div className="piece" >
                    <div className="info">
                        <div className="title">TARGET USER</div>
                        <div className="icons">
                            <div className="icon pencil" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="icon paint" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space">
                        {this.state.action}
                    </div>
                </div>
                <div className="piece" >
                    <div className="info">
                        <div className="title">PEOPLE</div>
                        <div className="icons">
                            <div className="icon pencil" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="icon paint" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space">
                        {this.state.action}
                    </div>
                </div>
                <div className="piece" >
                    <div className="info">
                        <div className="title">IMPACT</div>
                        <div className="icons">
                            <div className="icon pencil" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="icon paint" onClick={() => this.switchPlatform('text')}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space">
                        {this.state.action}
                    </div>
                </div>
            </div>
        )
    }
}