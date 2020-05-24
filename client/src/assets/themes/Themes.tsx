import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Main Color Palette
export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#F341CB',
      main: '#F012BE',
      dark: '#A80C85',
      contrastText: '#FFF'
    },
    secondary: {
      light: '#60D6D6',
      main: '#39CCCC',
      dark: '#278E8E',
      contrastText: '#FFF'
    },
    info: {
      light: '#D6D6D6',
      main: '#CCCCCC',
      dark: '#8E8E8E',
      contrastText: '#FFF'
    }
  }
})

// Header Color Palette
export const headerTheme = createMuiTheme({
  palette: {
      primary: {
          light: '#D6D6D6',
          main: '#CCCCCC',
          dark: '#8E8E8E',
          contrastText: '#FFF'
      },
      secondary: {
          light: '#60D6D6',
          main: '#39CCCC',
          dark: '#278E8E',
          contrastText: '#FFF'
      }
  }
})