import { useContext } from 'react'
import { types as mobxTypes } from 'mobx-state-tree'

import { has, forEachObjIndexed, keys, isEmpty, includes } from 'ramda'

import { MobXProviderContext } from 'mobx-react'
import { toJS as toJSON, runInAction } from 'mobx'

import type { TEditValue } from '~/spec'
import type { TRootStore } from '~/stores/RootStore'
import { isObject } from './validator'

export type { Instance } from 'mobx-state-tree'
export { getParent } from 'mobx-state-tree'

export { makeAutoObservable as battery, runInAction } from 'mobx'

// make the name shorter
export const T = {
  model: mobxTypes.model,
  opt: mobxTypes.optional,
  enum: mobxTypes.enumeration,
  string: mobxTypes.string,
  str: mobxTypes.string,
  number: mobxTypes.number,
  int: mobxTypes.number,
  maybeNull: mobxTypes.maybeNull,
  bool: mobxTypes.boolean,
  array: mobxTypes.array,
  frozen: mobxTypes.frozen,
}

type TStore = {
  mark: (obj: Record<string, unknown>) => void
  updateEditing?: (obj: Record<string, unknown>) => void
}

type TMobxContext = { store: TRootStore }
export const useMobxContext = () => useContext(MobXProviderContext) as TMobxContext

/*
 * a helper to update mobx state
 * just like setState in normal React component
 */
export const markStates = (sobj, self) => {
  if (!isObject(sobj)) {
    throw new Error('mark: invalid sobj, exepect a object')
  }
  const selfKeys = keys(self)

  forEachObjIndexed((val, key) => {
    if (!includes(key, selfKeys)) return false
    if (!isEmpty(val) && !Array.isArray(val) && isObject(val) && self[key] !== null) {
      // NOTE: had to use this syntax to update object val
      // because the normal one is NOT WORKING in production build
      // what a mother-fucking bug is this ??? TODO: check later
      self[key] = Object.assign(self[key], val)
    } else {
      self = Object.assign(self, { [key]: val })
    }
  }, sobj)

  return false
}

export const markStore = (target: Record<string, any>, store: any) => {
  if (!isObject(target)) {
    throw new Error('mark: invalid target, exepect a object')
  }
  const storeKeys = keys(store)

  runInAction(() => {
    forEachObjIndexed((val, key) => {
      if (!includes(key, storeKeys)) return false
      if (!isEmpty(val) && !Array.isArray(val) && isObject(val) && store[key] !== null) {
        // NOTE: had to use this syntax to update object val
        // because the normal one is NOT WORKING in production build
        // what a mother-fucking bug is this ??? TODO: check later
        store[key] = Object.assign(store[key], val)
      } else {
        store = Object.assign(store, { [key]: val })
      }
    }, target)
  })

  return false
}

export const toJS = (obj: any): any => {
  let result = obj

  // 如果对象有 toJSON 方法，则调用它
  if (result && typeof result === 'object') {
    result = toJSON(result)
  }

  if (Array.isArray(result)) {
    return result.map(toJS)
  }

  if (result && typeof result === 'object') {
    const newObj = { ...result }
    for (const key of Object.keys(newObj)) {
      newObj[key] = toJS(newObj[key]) //
    }
    // delete Graphql typename if need, otherwise it will cause gq type error
    delete newObj.__typename
    return newObj
  }

  return result
}

// export const toJS = (obj: any): any => {
//   if (!obj) return obj
//   return toJSON(obj)
// }

/*
 *
 * handle general form data change case
 * NOTE: this method require store has a updateEditing under the hook to do the real update
 *
 */
export const updateEditing = (store: TStore, part: string, v: TEditValue): void => {
  if (!store) return
  if (!store.updateEditing) {
    // biome-ignore lint/correctness/noVoidTypeReturn: <explanation>
    return console.warn('Error: updateEditing not found in store: ', store)
  }

  let value = v
  // @ts-ignore
  if (isObject(v) && has('target', v)) {
    /* eslint-disable prefer-destructuring */
    // @ts-ignore
    value = v.target.value
    /* eslint-enable prefer-destructuring */
  }

  store.updateEditing({ [part]: value })
}
