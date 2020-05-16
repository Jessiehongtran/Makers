import React, { useState } from 'react';
import '../styles/ideas.scss';

import { makeStyles } from '@material-ui/styles'

// Passing theme into the makeStyles function
const useStyles = makeStyles(theme => ({
    // Defining style objects (root, media, and title), which we can access later
    root: {
        // We access default and custom variables using our theme (theme.spacing is a default value)
      margin: theme.spacing(3),
      width: 345,
    },
    media: {
      height: 140,
    },
    title: {
      color: theme.palette.primary.main
    }
  }))
// Note: when defining styles we write a style object, similar to adding an inline style to a React elementstyle={{ height: '100px' }}

const IdeaFunctional = (props) => {

    // This is our style hook, allowing us to apply the styles as a className:
    const classes = useStyles()
    // console.log('props in idea', props)
    var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);

    return (
        <div className="idea">
            <div className="project-info">
            <p><span className="title">Project:</span><span style={{color: `#${titleRandomColor}`, fontWeight: 'bold', fontSize: '20px'}}> {props.idea.idea}</span></p>
            <p><span className="title">Category: </span><span className="text"> {props.idea.category}</span></p>
            <p><span className="title">Target users:</span>  <span className="text">{props.idea.target}</span></p>
            <p><span className="title">Impact:</span> <span className="text">{props.idea.impact}</span></p>
            <p><span className="title">Team: </span> <span className="text">{props.idea.HR}</span></p>
            <p><span className="title">Joined members: </span> <span className="text">{props.idea.join_count}</span></p>
            </div>
            <button className="join-btn" onClick={() => {
                props.history.push('/join')
                localStorage.setItem('ideaId', props.idea.id)
                }}>
                    Join
            </button>
        </div>
    )
// }
}

export default IdeaFunctional;