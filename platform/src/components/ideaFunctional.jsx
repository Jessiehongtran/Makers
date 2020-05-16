import React, { useState } from 'react';
import '../styles/ideas.scss';

// Icon Imports
import { FaHeart,
         FaShareAlt,
         FaArchive } from 'react-icons/fa'

// Material-UI Imports
import { Card,
    CardActionArea,
    CardActions,
    CardMedia,
    CardHeader,
    CardContent,
    Typography,
    IconButton,
    Button }          from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';


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
    // archiveIcon: {
    //   align: 'right'
    // }
  }))
// Note: when defining styles we write a style object, similar to adding an inline style to a React elementstyle={{ height: '100px' }}

const IdeaFunctional = (props) => {

  
    // This is our style hook, allowing us to apply the styles as a className:
    const classes = useStyles()
    // console.log('props in idea', props)
    var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);

    return (
        <Card className={classes.root}>
          <CardContent>
            <IconButton aria-label="archive this card"style={{ width: '180%', textAlign: 'right' }}>
              <FaArchive />
            </IconButton>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title} style={{color: `#${titleRandomColor}`}} >
            {props.idea.idea}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
                Category: {props.idea.category}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Target: {props.idea.target}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Impact: {props.idea.impact}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Team: {props.idea.HR}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Joined Members: {props.idea.join_count}
            </Typography>
          </CardContent>
        <CardActions disableSpacing>
        <CardActionArea>
          {/* <ExpandMoreIcon /> */}
          <Button size="small" color="primary" style={{color: `#${titleRandomColor}`}} onClick={() => {
                props.history.push('/join')
                localStorage.setItem('ideaId', props.idea.id)
                }}>
            Join
          </Button>
          </CardActionArea>
        {/* <CardActionArea> */}
        <IconButton aria-label="add to favorites">
          <FaHeart />
        </IconButton>
          {/* </CardActionArea> */}
        <IconButton aria-label="share">
          <FaShareAlt />
        </IconButton>
        </CardActions>
      </Card>
    )
// }
}

export default IdeaFunctional;