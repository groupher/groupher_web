import { FC } from 'react'

import type { TActive, TColor } from '@/spec'
import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'

import type { TActiveCondition } from './spec'
import { TodoIcon, WipIcon, DoneIcon, RejectIcon } from './styles/active_label'

type TProps = TColor &
  TActive & {
    condition: TActiveCondition
  }

const Icon: FC<TProps> = ({ condition, $active, $color }) => {
  switch (condition) {
    case ARTICLE_STATE.TODO: {
      return <TodoIcon $active={$active} $color={$color} />
    }
    case ARTICLE_STATE.WIP: {
      return <WipIcon $active={$active} $color={$color} />
    }
    case ARTICLE_STATE.DONE: {
      return <DoneIcon $active={$active} $color={$color} />
    }
    default: {
      return <RejectIcon $active={$active} $color={$color} />
    }
  }
}

export default Icon
