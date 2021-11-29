import { createMuiTheme }  from '@material-ui/core/styles'

// Custom theme can be extended to cover whatever variables we need: 
// Theme values => https://material-ui.com/customization/default-theme/

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
})

// Responsive Font Variant
theme.typography.h1 = {
  fontSize: '1.5rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};
export default theme