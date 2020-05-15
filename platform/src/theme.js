import { createMuiTheme }  from '@material-ui/core/styles'

// Custom theme can be extended to cover whatever variables we need: 
// Theme values => https://material-ui.com/customization/default-theme/

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
})

export default theme