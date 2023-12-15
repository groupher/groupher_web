import { keys, isEmpty, filter, forEach } from 'ramda'

import type { TTag } from '@/spec'
import { ICON_CMD } from '@/config'
import { groupByKey } from '@/helper'

import type { TMenu } from './spec'

export const tags2Options = (tags: TTag[]): TMenu => {
  const groupedTags = groupByKey(tags, 'group')
  const formated = []

  // @ts-ignore
  forEach((group, index) => {
    const icon = group === '城市' ? `${ICON_CMD}/navi/location.svg` : `${ICON_CMD}/navi/topic.svg`

    formated.push({
      id: index,
      title: group,
      icon,
      options: [{ id: '', title: '不限' }, ...groupedTags[group]],
    })
  }, keys(groupedTags))

  return formated
}

export const initActiveMap = (items: TMenu) => {
  const menuMap = {}
  for (let index = 0; index < items.length; index += 1) {
    const element = items[index]

    const content = element.options ? element.options[0] : element
    menuMap[element.id] = { ...content }
  }

  return menuMap
}

export const getSelectedTags = (activeMap: Record<string, TTag>): TTag[] => {
  const tagList = []

  const selectedIdx = filter((key) => !isEmpty(activeMap[key].id), keys(activeMap))

  forEach((idx) => {
    if (activeMap[idx]) {
      tagList.push(activeMap[idx])
    }
  }, selectedIdx)

  return tagList
}
