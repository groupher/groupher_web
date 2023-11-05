import { FC, useContext } from 'react'
import { types as mobxTypes } from 'mobx-state-tree'

import { path, has, curry, forEachObjIndexed, keys, isEmpty, contains } from 'ramda'

import { inject, observer, MobXProviderContext } from 'mobx-react'
import { toJS as toJSON } from 'mobx'

import type { TEditValue } from '@/spec'
import type { TRootStore } from '@/stores/RootStore'
import { isObject } from './validator'

export type { Instance } from 'mobx-state-tree'
export { getParent } from 'mobx-state-tree'

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
}

type TStore = {
  mark: (obj: Record<string, unknown>) => void
  updateEditing?: (obj: Record<string, unknown>) => void
}

type TMobxContext = { store: TRootStore }
export const useMobxContext = () => useContext(MobXProviderContext) as TMobxContext

/*
 * select sub store from root store
 * by design, one container should only access it's own store
 *
 * see: https://github.com/mobxjs/mobx-react Customizing inject
 *
 * 从根状态树中选出子状态树
 * 一个容器组件只能连接到一个和它相关的子状态树
 *
 */
const storeSelector = curry((selectedStore, props) => ({
  [selectedStore]: path(['store', selectedStore], props),
}))

/*
 * inject sub-store to container base on second args
 * 根据第二个参数绑定子状态树
 *
 * NOTE: KNOWN ISSUE:
 * because the type information of the incoming container cannot be obtained,
 * only an empty React.FC can be returned here, which will cause a type error in
 * the place where this container is used, and it needs to be manually exported where it
 * is used, such as:
 *
 * ---
 * 因为无法获取传入的 container 的类型信息，导致这里只能返回一个空的 React.FC,这
 * 会导致使用这个 container 的地方出现类型报错，需要在使用的地方手动导出，比如:
 *
 */
export const bond = (container: FC, subStore: string): FC => {
  return inject(storeSelector(subStore))(observer(container))
}

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
    if (!contains(key, selfKeys)) return false
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

export const toJS = (obj: any): any => {
  if (!obj) return obj
  return toJSON(obj)
}

/*
 *
 * handle general form data change case
 * NOTE: this method require store has a updateEditing under the hook to do the real update
 *
 */
export const updateEditing = (store: TStore, part: string, v: TEditValue): void => {
  if (!store) return
  if (!store.updateEditing) {
    // eslint-disable-next-line no-console
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
