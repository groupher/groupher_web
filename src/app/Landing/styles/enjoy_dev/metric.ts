import type { TArticleCat } from '@/spec'

import { ARTICLE_CAT } from '@/constant/gtd'
import { COLOR_NAME } from '@/constant/colors'

export const getNodeBlockColors = (cat: TArticleCat | 'DEFAULT' = ARTICLE_CAT.FEATURE) => {
  switch (cat) {
    case ARTICLE_CAT.FEATURE: {
      return {
        headerBg: '#efddedc2',
        barBg: '#EFDDED',
        border: '#EFDDED',
        contentBg: '#FCF6FB',
        main: '#AF6BAC',
        bg: COLOR_NAME.PURPLE,
      }
    }
    case ARTICLE_CAT.OTHER: {
      return {
        headerBg: '#dee0f2a1',
        barBg: '#dee0f2',
        border: '#dee0f2',
        contentBg: '#F7F8FF',
        main: '#506db3',
        bg: COLOR_NAME.BLUE,
      }
    }
    case ARTICLE_CAT.BUG: {
      return {
        headerBg: '#ffecec',
        barBg: '#ffe1e1',
        boarder: '#ffe1e1',
        contentBg: '#fef9f9',
        bg: COLOR_NAME.RED,
      }
    }
    case ARTICLE_CAT.QUESTION: {
      return {
        headerBg: '#faebd7',
        barBg: '#faebd7',
        border: '#faebd7',
        contentBg: '#FFFBF4',
        main: '#C48B00',
        bg: COLOR_NAME.BROWN,
      }
    }

    default: {
      return {
        headerBg: '#F2F2F2',
        barBg: '#F2F2F2',
        border: '#dddddd',
        contentBg: 'white',
        main: '#888888',
        bg: COLOR_NAME.BLACK,
      }
    }
  }
}

export const holder = 1
