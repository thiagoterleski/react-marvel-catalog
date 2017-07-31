import {
  LOAD_ALL_CHARACTERS,
  LOAD_CHARACTER,
  LOAD_CHARACTER_COMICS,
  FILTER_CHARACTERS,
  CHANGE_FILTER,
  CLOSE_CHARACTER_DIALOG,
} from '../types'

const INITIAL_STATE = {
  characters: {
    hasMore: true,
    isLoading: false,
    isSearching: false,
    items: [],
    original: [],
    count: 12,
    total: 0,
    filter: '',
  },
  character: {
    isModalOpen: false,
    isLoading: false,
    current: {},
    comics: {},
    isComicsLoaded: false,
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        characters: {
          ...state.characters,
          filter: action.value,
          isLoading: true,
        },
      }
    case LOAD_CHARACTER.REQUEST:
      return {
        ...state,
        character: {
          ...state.character,
          isModalOpen: true,
          current: action.payload,
        },
      }
    case LOAD_CHARACTER_COMICS.REQUEST:
      return {
        ...state,
        character: {
          ...state.character,
          isLoading: true,
        },
      }
    case LOAD_CHARACTER_COMICS.SUCCESS:
      return {
        ...state,
        character: {
          ...state.character,
          comics: action.data,
          isLoading: false,
          isComicsLoaded: true,
        },
      }
    case CLOSE_CHARACTER_DIALOG:
      return {
        ...state,
        character: {
          ...state.character,
          isModalOpen: false,
          isLoading: false,
          isComicsLoaded: false,
          current: {},
        },
      }
    case LOAD_ALL_CHARACTERS.REQUEST:
      return {
        ...state,
        character: {
          ...state.character,
          isLoading: true,
        },
      }
    case LOAD_ALL_CHARACTERS.SUCCESS:
      return {
        ...state,
        characters: {
          ...state.characters,
          isLoading: false,
          total: action.total,
          hasMore: action.hasMore,
          items: state.characters.items.concat(action.characters),
          original: state.characters.items,
        },
      }
    case LOAD_ALL_CHARACTERS.FAILURE:
      return {
        ...state,
        characters: {
          ...state.characters,
          isLoading: false,
          items: action.characters,
        },
      }
    case FILTER_CHARACTERS.REQUEST:
      return {
        ...state,
        characters: {
          ...state.characters,
          isLoading: false,
          isSearching: true,
          filter: action.payload,
        },
      }
    case FILTER_CHARACTERS.SUCCESS:
      return {
        ...state,
        characters: {
          ...state.characters,
          isSearching: false,
          total: action.total,
          hasMore: action.hasMore,
          items: action.characters,
        },
      }
    case FILTER_CHARACTERS.CANCEL:
      return {
        ...state,
        characters: {
          ...state.characters,
          isSearching: false,
          filter: '',
          items: state.characters.original,
        },
      }
    default:
      return state
  }
}
