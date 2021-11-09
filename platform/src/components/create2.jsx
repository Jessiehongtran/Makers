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
            action: {
                idea: <></>,
                target_user: <></>,
                human_resources: <></>,
                impact: <></>,
            },
            new_project: {
                idea: "",
                project_name: "",
                category_id: 0,
                target_user: "",
                human_resources: "",
                impact: "",
                join_count: 1,
                description: "",
                upvote: 0
            },
            bgColors: [{ id: 1, color: '#fff'} , { id: 2, color: '#fff'} , { id: 3, color: '#fff'}, { id: 4, color: '#fff'}]
        }

        this.switchPlatform = this.switchPlatform.bind(this)
        this.updateNewProject = this.updateNewProject.bind(this)
        this.turnAttentionToIcons = this.turnAttentionToIcons.bind(this)
    }

    switchPlatform(command, tag, placeholder){
        if (command === "text"){
            this.setState({ action:{...this.state.action, [tag]: <Text updateNewProject={this.updateNewProject} tag={tag} placeholder={placeholder} />}})
        }
        if (command === "sketch"){
            this.setState({ action: {...this.state.action, [tag]: <Sketch updateNewProject={this.updateNewProject} tag={tag} width={500} height={650} />}})
        }
    }

    updateNewProject(tag, update){
        this.setState({new_project: {...this.state.new_project, [tag]: update }})
        console.log('new_project', this.state.new_project)
    }

    turnAttentionToIcons(ind){
        let { bgColors } = this.state
        bgColors.forEach(bg => bg.id === ind ? bg.color = '#FBD6D6' : bg.color= '#fff')
        this.setState({ bgColors: bgColors })
    }

    render(){


        return (
            <div style={{width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', padding: '20px 100px'}}>
                <div className="piece" onMouseOver={() => this.turnAttentionToIcons(1)}>
                    <div className="info">
                        <div className="title">IDEA</div>
                        <div className="icons">
                            <div className="create-icon pencil" onClick={() => this.switchPlatform('text', 'idea', 'What if..')} style={{backgroundColor: `${this.state.bgColors[0].color}`}}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="create-icon paint" onClick={() => this.switchPlatform('sketch', 'idea')} style={{backgroundColor: `${this.state.bgColors[0].color}`}}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        {this.state.action.idea}
                    </div>
                </div>
                <div className="piece" onMouseOver={() => this.turnAttentionToIcons(2)}>
                    <div className="info">
                        <div className="title">TARGET USER</div>
                        <div className="icons">
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('text', 'target_user', 'For people who..')} style={{backgroundColor: `${this.state.bgColors[1].color}`}}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('sketch', 'target_user')} style={{backgroundColor: `${this.state.bgColors[1].color}`}}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.action.target_user}
                    </div>
                </div>
                <div className="piece" onMouseOver={() => this.turnAttentionToIcons(3)} >
                    <div className="info">
                        <div className="title">PEOPLE</div>
                        <div className="icons">
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('text', 'human_resources', 'My team are..')} style={{backgroundColor: `${this.state.bgColors[2].color}`}}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('sketch', 'human_resources')} style={{backgroundColor: `${this.state.bgColors[2].color}`}}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.action.human_resources}
                    </div>
                </div>
                <div className="piece" onMouseMove={() => this.turnAttentionToIcons(4)}>
                    <div className="info">
                        <div className="title">IMPACT</div>
                        <div className="icons">
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('text', 'impact', 'I dream to..')} style={{backgroundColor: `${this.state.bgColors[3].color}`}}>
                                <FontAwesomeIcon icon={faPencilAlt}  />
                            </div>
                            <div className="create-icon pencil"  onClick={() => this.switchPlatform('sketch', 'impact')} style={{backgroundColor: `${this.state.bgColors[3].color}`}}>
                                <FontAwesomeIcon icon={faPaintBrush}  />
                            </div>
                        </div>
                    </div>
                    <div className="space" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {this.state.action.impact}
                    </div>
                </div>
            </div>
        )
    }
}