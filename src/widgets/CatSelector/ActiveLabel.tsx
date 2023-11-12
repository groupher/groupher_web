import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Wrapper, Hint, LabelWrapper, ICON, Title } from './styles/active_label'

type TProps = {
  cat: TArticleCat
}

const ActiveLabel: FC<TProps> = ({ cat }) => {
  const ActiveIcon = ICON[cat]
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper $color={primaryColor}>
      <Hint>分类</Hint>
      <LabelWrapper>
        <ActiveIcon $color={primaryColor} />
        <Title>{Trans(cat)}</Title>
      </LabelWrapper>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
