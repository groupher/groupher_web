import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, ICON, Title } from './styles/active_label'

type TProps = {
  cat: TArticleCat
}

const ActiveLabel: FC<TProps> = ({ cat }) => {
  const ActiveIcon = ICON[cat]
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $color={primaryColor}>
      <ActiveIcon $color={primaryColor} />
      <Title>{Trans(cat)}</Title>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
