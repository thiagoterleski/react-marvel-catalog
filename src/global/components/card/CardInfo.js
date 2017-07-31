import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

const styleSheet = createStyleSheet('CardInfo', ({
  shadows,
  palette,
  spacing,
  typography,
  transitions,
}) => ({
  card: {
    'height': 180,
    'backgroundPosition': 'center center',
    'backgroundSize': 'cover',
    'border': 0,
    'flexGrow': 1,
    'position': 'relative',
    'boxShadow': shadows[3],
    'overflow': 'hidden',
    'borderRadius': 4,
    'transition': 'all .400s ease',
    'cursor': 'pointer',
    'transform': 'perspective(500px) translateZ(1px)',
    'zIndex': 1,
    'transitionTimingFunction': transitions.easing.easeInOut,
    '&:focus': {
      'outline': 'none',
    },
    '&:hover': {
      'boxShadow': shadows[12],
      'zIndex': 9,
      'transform': 'perspective(500px) translateZ(20px)',
    },
  },
  title: {
    color: palette.common.darkWhite,
    fontWeight: typography.fontWeightMedium,
  },
  comics: {
    color: palette.common.darkWhite,
    fontSize: 12,
  },
  textContainer: {
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
    left: 0,
    textAlign: 'left',
    margin: (spacing.unit * 2),
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))',
  },
}))

const CardInfo = ({ classes, item, onPress }) => {
  const image = `${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`

  // eslint-disable-next-line
  return (
    <button
      onClick={(e) => onPress(e)}
      className={classes.card}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={classes.overlay}>
        <div className={classes.textContainer}>
          <Typography
            className={classes.title}
            type="subheading"
            gutterBottom
          >
            {item.name}
          </Typography>
          <Typography
            className={classes.comics}
            type="body2"
            gutterBottom
          >
            {item.comics.available} Comics
          </Typography>
        </div>
      </div>
    </button>
  )
}

CardInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object,
  onPress: PropTypes.func,
}

export default withStyles(styleSheet)(CardInfo)
