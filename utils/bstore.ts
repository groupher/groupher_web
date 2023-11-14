import store from 'store'

// js-cookie details: https://github.com/js-cookie/js-cookie
// store.js details: https://github.com/marcuswestin/store.js
const BStore = {
  // NOTE: if store json, JSON.parse is not need
  // is the json is valid, result will be the json, otherwise it will be string
  get: (value: string, optional?: string): string => store.get(value, optional),
  set: (key: string, value: string): void => store.set(key, value),
  remove: (key: string): void => store.remove(key),
  clearAll: (): void => store.clearAll(),
  cookie: {
    set: (key, value) => console.log('## cookie set todo'),
    remove: (key) => console.log('## cookie remove todo'),
  },
}

export default BStore
