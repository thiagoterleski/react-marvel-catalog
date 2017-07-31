import { createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green'

export const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: {
      ...green,
    },
  }),
  overrides: {
    MuiAppBar: {
      height: 70,
    },
  },
})
