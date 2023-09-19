import { FC } from 'react'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/i18n'

import { Wrapper, Icon } from './styles/active_label'

type TProps = {
  cat: TArticleCat
}

const ActiveLabel: FC<TProps> = ({ cat }) => {
  const ActiveIcon = Icon[cat]

  return (
    <Wrapper>
      <ActiveIcon />
      {Trans(cat)}
    </Wrapper>
  )
}

export default ActiveLabel
