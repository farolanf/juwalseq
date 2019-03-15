import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 960,
      lg: 1200,
      xl: 1600,
    }
  }
})

export default theme