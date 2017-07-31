/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import { connect } from 'react-redux'
import { createStyleSheet, withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import ReactPaginate from 'react-paginate'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'
import { closeCharacterDialog, loadCharacterComics } from '../../../store/actions'
import ComicItem from './ComicItem'

const styleSheet = createStyleSheet('DetailsModal', (theme) => ({
  tabContainer: {
    flex: 1,
    margin: (theme.spacing.unit * 2),
  },

  paper: {
    minWidth: 400,
  },
  title: {
    color: 'white',
  },
  emptyMessage: {
    margin: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  rootContent: {
    padding: 0,
  },
  rootTitle: {
    backgroundColor: theme.palette.primary[500],
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rootActions: {
    justifyContent: 'center',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
  },
  actionsContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  contentProgress: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    padding: 0,
  },
  paginationItem: {
    flex: 1,
    listStyle: 'none',
    fontSize: theme.typography.fontSize,
    margin: `0 ${theme.spacing.unit}px`,
    fontFamily: theme.typography.fontFamily,
  },
  paginationActiveItem: {
    color: theme.palette.primary[500],
  },
  paginationItemLink: {
    padding: (theme.spacing.unit / 2),
    cursor: 'pointer',
    outline: 'none',
  },
  paginationNavItem: {
    listStyle: 'none',
    fontSize: theme.typography.fontSize,
    fontFamily: theme.typography.fontFamily,
  },
  paginationNavItemLink: {
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  avatar: {
    width: 120,
    minWidth: 120,
    height: 120,
    marginRight: (theme.spacing.unit * 2),
    borderRadius: '50%',
  },
  descContainer: {
    backgroundColor: theme.palette.grey[100],
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    boxShadow: theme.shadows[2],
  },
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: (theme.spacing.unit * 2),
  },
}))

class DetailsModal extends Component {
  constructor() {
    super()
    this.state = {
      index: 0,
    }
  }
  handlePageClick = (data) => {
    const selected = data.selected
    const offset = Math.ceil(selected * this.props.comics.count)

    this.props.loadCharacterComics(this.props.current.id, offset)
  }

  render() {
    const {
      classes,
      isLoading,
      isModalOpen,
      current,
      comics,
      isComicsLoaded,
      closeCharacterDialog,
    } = this.props

    const pageCount = Math.ceil(comics.total / comics.limit)
    const image = (Object.keys(current).length) ? `${current.thumbnail.path}/standard_amazing.${current.thumbnail.extension}` : null

    return (
      <div>
        <Dialog
          open={isModalOpen}
          onRequestClose={closeCharacterDialog}
          maxWidth={'sm'}
          classes={{
            paper: classes.paper,
          }}
        >
          <DialogTitle disableTypography classes={{ root: classes.rootTitle }}>
            <Typography type="title" className={classes.title}>
              {current.name} | Comics
            </Typography>
          </DialogTitle>
          { current.description && (
            <DialogTitle disableTypography className={classes.descContainer}>
              { image && (
                <img
                  alt={current.name}
                  src={image}
                  className={classes.avatar}
                  width={120}
                  height={120}
                />
              ) }
              <Typography type="body1" className={classes.description}>
                {current.description}
              </Typography>
            </DialogTitle>
          ) }
          { (isLoading === true && isComicsLoaded === false) && (
            <DialogContent className={classes.loadingContainer}>
              <CircularProgress color="accent" className={classes.progress} />
            </DialogContent>
          )}
          { ((isLoading === false && isComicsLoaded === true) || isComicsLoaded === true) && (
            <DialogContent style={{ padding: 0, opacity: (isLoading) ? 0.5 : 1, pointerEvents: (isLoading) ? 'none' : 'all' }}>
              { comics.total === 0 && (
                <Typography type="body1" className={classes.emptyMessage}>
                  This character has no comic books
                </Typography>
              ) }
              <div className="comicsList">
                { comics.results.map((comic) => ( // eslint-disable-line
                  <ComicItem key={comic.id} comic={comic} />
                )) }
              </div>
            </DialogContent>
          )}
          { ((isLoading === false && isComicsLoaded === true && comics.total > 0)
            || (isComicsLoaded === true && comics.total > 0)) && (
            <DialogActions classes={{ root: classes.rootActions }}>
              <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={<a href="#">...</a>}
                breakClassName={classes.paginationItem}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={classes.paginationContainer}
                pageClassName={classes.paginationItem}
                pageLinkClassName={classes.paginationItemLink}
                previousClassName={classes.paginationNavItem}
                nextClassName={classes.paginationNavItem}
                previousLinkClassName={classes.paginationNavItemLink}
                nextLinkClassName={classes.paginationNavItemLink}
                subContainerClassName={'pages pagination'}
                activeClassName={classes.paginationActiveItem}
              />
            </DialogActions>
          )}
        </Dialog>
      </div>
    )
  }
}

DetailsModal.defaultProps = {
  open: true,
}

DetailsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  current: PropTypes.object,
  comics: PropTypes.object,
  // eslint-disable-next-line
  isComicsLoaded: PropTypes.bool,
  isModalOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  closeCharacterDialog: PropTypes.func,
  loadCharacterComics: PropTypes.func,
}

const mapStateToProps = (state) => ({
  isLoading: state.app.character.isLoading,
  isModalOpen: state.app.character.isModalOpen,
  current: state.app.character.current,
  comics: state.app.character.comics,
  isComicsLoaded: state.app.character.isComicsLoaded,
})

const enhance = compose(
  withStyles(styleSheet),
  onlyUpdateForKeys(['isLoading', 'isModalOpen', 'current']),
  connect(mapStateToProps, { closeCharacterDialog, loadCharacterComics }),
)

export default enhance(DetailsModal)
