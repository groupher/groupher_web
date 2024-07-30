import type { TButtonPrefix } from '~/spec'
import BUTTON_PREFIX from '~/const/button_prefix'

import { CategoryIcon, SortIcon, WipIcon } from '../styles/dropdown_button'

type TProps = {
  type: TButtonPrefix | null
}

export default ({ type }: TProps) => {
  switch (type) {
    case BUTTON_PREFIX.CATETORY: {
      return <CategoryIcon />
    }

    case BUTTON_PREFIX.SORT: {
      return <SortIcon />
    }

    case BUTTON_PREFIX.STATUS: {
      return <WipIcon />
    }

    default: {
      return null
    }
  }
}
