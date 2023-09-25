import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, Icon, Title } from './styles/active_label'

type TProps = {
  cat: TArticleCat
}

const ActiveLabel: FC<TProps> = ({ cat }) => {
  const ActiveIcon = Icon[cat]
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper primaryColor={primaryColor}>
      <ActiveIcon primaryColor={primaryColor} />
      <Title>{Trans(cat)}</Title>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
