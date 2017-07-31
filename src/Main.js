import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { CharactersScreen } from './screens'
import { TopBar, DetailsModal } from './global/components'

const styleSheet = createStyleSheet('MainLayout', () => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbarContainer: {
    flexGrow: 0,
  },
  contentWrapper: {
    flex: 1,
    marginTop: 48,
    overflowY: 'scroll',
  },
}))

const MainLayout = (props) => {
  const classes = props.classes

  return (
    <div className={classes.root}>
      <DetailsModal />
      <div className={classes.navbarContainer}>
        <TopBar />
      </div>
      <div className={classes.contentWrapper}>
        <DetailsModal />
        <CharactersScreen />
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(MainLayout)
