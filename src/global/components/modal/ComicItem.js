import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import moment from 'moment'
import DescriptionIcon from 'material-ui-icons/Description'
import DateRangeIcon from 'material-ui-icons/DateRange'

const styleSheet = createStyleSheet('Loader', (theme) => ({
  item: {
    display: 'flex',
    padding: (theme.spacing.unit * 2),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  col: {
    flex: 1,
  },
  colRight: {
    flex: 1,
    paddingLeft: (theme.spacing.unit * 2),
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  header: {
    marginBottom: (theme.spacing.unit),
  },
  infoCard: {
    ...theme.typography.body1,
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[500],
    marginRight: (theme.spacing.unit * 2),
  },
  infoCardCode: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  chip: {
    marginRight: (theme.spacing.unit * 2),
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoCardIcon: {
    width: 16,
    height: 16,
    color: theme.palette.grey[500],
  },
  actions: {
    marginTop: theme.spacing.unit,
  },
  actionsButton: {
    marginRight: (theme.spacing.unit),
    fontSize: 12,
  },
}))

const getPublishedDate = (dates) => {
  const date = dates.find((date) => date.type === 'focDate').date

  return (date) ? moment(date).format('MMM Do YY') : null
}

// eslint-disable-next-line
const Comics = ({ classes, visible, comic }) => (
  <div className={classes.item}>
    <div className={classes.col} style={{ flexGrow: 0 }}>
      <img
        width={100}
        src={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
        alt={comic.title}
      />
    </div>
    <div className={classes.colRight}>
      <div className={classes.header}>
        <Typography type="subheading" className={classes.title}>
          {comic.title}
        </Typography>
        <div className={classes.info}>
          <span className={`${classes.infoCard} ${classes.infoCardCode}`}>{comic.diamondCode}</span>
          <span className={classes.infoCard}>
            <DescriptionIcon className={classes.infoCardIcon} />
            {comic.pageCount} Pages
          </span>
          <span className={classes.infoCard}>
            <DateRangeIcon className={classes.infoCardIcon} />
            Published: {getPublishedDate(comic.dates)}
          </span>
        </div>
      </div>
      { (comic.description && (
        <Typography type="body1">
          { comic.description}
        </Typography>
      )) }
      { comic.urls.length && (
        <div className={classes.actions}>
          {comic.urls.map((url) => (
            <Button key={url.type} href={url.url} raised dense className={classes.actionsButton}>
              {url.type.toUpperCase()}
            </Button>
          ))}
        </div>
      ) }
    </div>
  </div>
)

Comics.propTypes = {
  visible: PropTypes.bool,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styleSheet)(Comics)
