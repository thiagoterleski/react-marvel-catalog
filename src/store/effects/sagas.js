import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  LOAD_ALL_CHARACTERS,
  FILTER_CHARACTERS,
  LOAD_CHARACTER,
  LOAD_CHARACTER_COMICS,
} from '../types'
import MarvelAPI from '../../services/MarvelAPI'


/*
* Selector. The query depends by the state shape
*/
export const getState = (state) => state.app

function* fetchCharactersFromApi(action) {
  const state = yield select(getState)

  try {
    const response = yield call(MarvelAPI.getCharacters,
      {
        page: action.page,
        count: 12,
        nameStartsWith: state.characters.filter || null,
      })

    const data = yield call([response, response.json])
    const { results, total, offset, count } = data.data

    yield put({
      type: LOAD_ALL_CHARACTERS.SUCCESS,
      characters: results,
      total: total,
      hasMore: Boolean(total > count && offset < total),
    })
  } catch (e) {
    yield put({ type: LOAD_ALL_CHARACTERS.FAILURE, message: e.message })
  }
}

function* fetchFilteredCharactersFromApi(action) {
  try {
    const response = yield call(MarvelAPI.getCharacters,
      { page: 1, nameStartsWith: action.payload },
    )
    const data = yield call([response, response.json])
    const { results, total, offset, count } = data.data

    yield put({
      type: FILTER_CHARACTERS.SUCCESS,
      characters: results,
      total: total,
      hasMore: Boolean(total > count && offset < total),
    })
  } catch (e) {
    yield put({ type: LOAD_ALL_CHARACTERS.FAILURE, message: e.message })
  }
}

function* fetchComics({ characterId, offset = 0 }) {
  try {
    const responseComics = yield call(MarvelAPI.getComicsByCharacter, characterId, offset)
    const dataComics = yield call([responseComics, responseComics.json])

    yield put({
      type: LOAD_CHARACTER_COMICS.SUCCESS,
      data: dataComics.data,
    })
  } catch (e) {
    yield put({ type: LOAD_CHARACTER_COMICS.FAILURE, message: e.message })
  }
}

function* loadCharacter({ payload }) {
  yield put({ type: LOAD_CHARACTER_COMICS.REQUEST, characterId: payload.id, offset: 0 })
}

function* rootSagas() {
  yield takeEvery(LOAD_ALL_CHARACTERS.REQUEST, fetchCharactersFromApi)
  yield takeEvery(FILTER_CHARACTERS.REQUEST, fetchFilteredCharactersFromApi)
  yield takeEvery(LOAD_CHARACTER.REQUEST, loadCharacter)
  yield takeEvery(LOAD_CHARACTER_COMICS.REQUEST, fetchComics)
}

export default rootSagas
