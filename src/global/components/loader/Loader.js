import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styleSheet = createStyleSheet('Loader', (theme) => ({
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 2,
  },
  loader: {
    marginRight: theme.spacing.unit,
  },
}))

// eslint-disable-next-line
const Loader = ({ classes, visible }) => (visible) ? (
  <div className={classes.loaderContainer}>
    <CircularProgress size={32} className={classes.loader} />
    <Typography type="subheading">
      Loading content..
    </Typography>
  </div>
) : null

Loader.propTypes = {
  visible: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Loader)
