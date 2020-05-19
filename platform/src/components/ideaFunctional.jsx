import React, { useState } from 'react';
import '../styles/ideas.scss';

// Icon Imports
import { FaHeart,
    FaShareAlt,
    FaArchive,
    FaUsers,
    FaUserFriends,
    FaAward,
    FaStream } from 'react-icons/fa'

// Material-UI Imports
import { Card,
    CardActionArea,
    CardActions,
    CardMedia,
    CardHeader,
    CardContent,
    Divider,
    Typography,
    IconButton,
    Button }          from '@material-ui/core'

import { withStyles } from "@material-ui/core/styles";



// Passing theme into the makeStyles function
const styles = theme => ({
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
    },
    divider: {
      margin: `${theme.spacing.unit * 2.5}px 0`
    },
    dividerSecondary: {
      margin: `${theme.spacing.unit * 1.5}px 0`
    }
  })
// Note: when defining styles we write a style object, similar to adding an inline style to a React elementstyle={{ height: '100px' }}

class IdeaFunctional extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          forward: 0
        }

      this.increaseForward = this.increaseForward.bind(this);
        
    }

    increaseForward(){
      var forward = this.state.forward + 1
      this.setState({forward: forward})
    }

    render(){
      var titleRandomColor = Math.floor(Math.random()*16777215).toString(16);
      const {classes} = this.props

      console.log("forward", this.state.forward)

    return (
        <Card className={classes.root}>
            <IconButton aria-label="archive this card"style={{ width: '180%', textAlign: 'right', margin: '0px 0px -1.2rem 0.3rem' }}>
              <FaArchive />
            </IconButton>
          <CardContent>
               <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
              title="Project Image"
            />
            <Divider className={classes.divider} light />
              <Typography gutterBottom variant="h1" component="h1" className={classes.title} style={{color: `#${titleRandomColor}`}} >
                {this.props.idea.project_name}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="p">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              </Typography>
              <Divider className={classes.dividerSecondary} light />
              <Typography variant="body2" color="textSecondary" component="p">
                  Target: {this.props.idea.target_user}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{paddingTop: '.5rem'}}>
                <FaAward /> Impact: {this.props.idea.impact}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" style={{paddingTop: '.5rem'}}>
                <FaUsers style={{marginRight: '.2rem'}}/> Team: {this.props.idea.human_resources}
              </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" style={{paddingTop: '.5rem'}}>
                <FaUserFriends style={{marginRight: '.2rem'}}/> Joined Members: {this.props.idea.join_count}
              </Typography>
            </CardActionArea>
          </CardContent>
        <CardActions disableSpacing>
        <CardActionArea>
          <Button size="small" color="primary" style={{color: `#${titleRandomColor}`}} onClick={() => {
                this.props.history.push('/join')
                localStorage.setItem('ideaId', this.props.idea.id)
                }}>
            Join
          </Button>
        </CardActionArea>
        <img 
          className="forward-btn" 
          onClick={() => this.increaseForward()}
          src="https://res.cloudinary.com/dfulxq7so/image/upload/v1589909084/Screen_Shot_2020-05-19_at_10.24.22_AM_c0tipf.png"
        />
        <p>{this.state.forward}</p>
        {/* <IconButton aria-label="add to favorites">
          <FaHeart />
        </IconButton> */}
        {/* <IconButton aria-label="share">
            <FaShareAlt />
          </IconButton> */}
        </CardActions>
      </Card>
    )
  }
}

export default withStyles(styles, { withTheme: true })(IdeaFunctional);