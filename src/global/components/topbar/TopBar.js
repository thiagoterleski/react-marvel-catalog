import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import FilterBar from './FilterBar'

import Logo from '../../../assets/images/react-marvel.png'
import LogoGit from '../../../assets/images/github-logo.png'

const styleSheet = createStyleSheet('TopBar', (theme) => ({
  root: {
    width: '100%',
  },
  logo: {
    marginRight: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
  orderWidget: {
    marginRight: theme.spacing.unit,
  },
  topBar: {
    [theme.breakpoints.up('md')]: {
      height: 48,
    },
    [theme.breakpoints.only('xs')]: {
      height: 'auto',
      padding: theme.spacing.unit,
    },
  },
  toolbarRoot: {
    [theme.breakpoints.only('xs')]: {
      height: 'auto',
      flexDirection: 'column',
    },
  },
  leftContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  rightContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
}))

const TopBar = (props) => {
  const classes = props.classes

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        classes={{
          root: props.classes.topBar,
        }}
      >
        <Toolbar className={classes.toolbarRoot}>
          <div className={classes.leftContent}>
            <img className={classes.logo} src={Logo} height={32} alt={'React Marvel Catalog'} />
            <Typography type="subheading" color="inherit">
              React Marvel Catalog
            </Typography>
          </div>
          <div className={classes.rightContent}>
            <FilterBar />
            <IconButton color="contrast">
              <img src={LogoGit} alt={'Github'} width={16} height={16} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(TopBar)
