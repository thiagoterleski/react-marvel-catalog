/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import InfiniteScroll from 'react-infinite-scroller'
import { Loader, CardInfo } from '../../global/components'
import { loadAllCharacters, loadCharacterById } from '../../store/actions'

const styleSheet = createStyleSheet('CharactersScreen', (theme) => ({
  container: {
    padding: (theme.spacing.unit * 2),
  },
  itemCard: {
    display: 'flex',
  },
}))

class CharactersScreen extends Component {

  constructor() {
    super()
    this.renderItems = this.renderItems.bind(this)
  }

  renderItems() {
    const { classes, characters, loadCharacterById } = this.props

    return characters.map((item) => (
      <Grid key={item.id} item xs={12} sm={4} md={2} lg={2} className={classes.itemCard}>
        <CardInfo item={item} onPress={() => loadCharacterById(item)} />
      </Grid>
    ))
  }

  render() {
    const { classes, hasMore } = this.props

    // eslint-disable-next-line
    return (
      <InfiniteScroll
        className={classes.container}
        pageStart={0}
        element={'div'}
        loadMore={(page) => this.props.loadAllCharacters(page)}
        hasMore={hasMore}
        threshold={340}
        useWindow={false}
        loader={<Loader visible />}
      >
        <Grid container className={classes.contentCards} align={'center'}>
          { this.renderItems() }
        </Grid>
      </InfiniteScroll>
    )
  }
}

CharactersScreen.propTypes = {
  classes: PropTypes.object.isRequired,
  loadCharacterById: PropTypes.func,
  loadAllCharacters: PropTypes.func,
  characters: PropTypes.array.isRequired,
  hasMore: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  characters: state.app.characters.items,
  hasMore: state.app.characters.hasMore,
})

const enhance = compose(
  withStyles(styleSheet),
  connect(mapStateToProps, { loadAllCharacters, loadCharacterById }),
)

export default enhance(CharactersScreen)
