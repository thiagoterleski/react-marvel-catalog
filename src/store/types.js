// eslint-disable-next-line no-unused-vars

const TYPES = [
  'REQUEST',
  'SUCCESS',
  'FAILURE',
  'CANCEL',
  'RESET',
]

const makeActionTypes = (base) => {
  const ref = {}

  TYPES.forEach((type) => {
    ref[type] = `${base}_${type}`
  })

  return ref
}

export const LOAD_ALL_CHARACTERS = makeActionTypes('LOAD_ALL_CHARACTERS')
export const LOAD_CHARACTER = makeActionTypes('LOAD_CHARACTER')
export const LOAD_CHARACTER_COMICS = makeActionTypes('LOAD_CHARACTER_COMICS')
export const FILTER_CHARACTERS = makeActionTypes('FILTER_CHARACTERS')
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CLOSE_CHARACTER_DIALOG = 'CLOSE_CHARACTER_DIALOG'
