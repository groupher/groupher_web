import type { TSubMenu } from '../spec'
import { SUB_MENU_TYPE } from '../constant'

export const getSubMenuWidth = (subType: TSubMenu): string => {
  switch (subType) {
    case SUB_MENU_TYPE.SLUG: {
      return '240px'
    }
    default: {
      return '140px'
    }
  }
}

export const holder = 1
