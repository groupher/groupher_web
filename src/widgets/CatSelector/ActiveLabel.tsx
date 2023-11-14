import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TArticleCat } from '@/spec'
import { Trans } from '@/i18n'

import { Wrapper, Hint, LabelWrapper, ICON, Title } from './styles/active_label'

type TProps = {
  cat: TArticleCat
}

const ActiveLabel: FC<TProps> = ({ cat }) => {
  const ActiveIcon = ICON[cat]

  return (
    <Wrapper>
      <Hint>分类</Hint>
      <LabelWrapper>
        <ActiveIcon />
        <Title>{Trans(cat)}</Title>
      </LabelWrapper>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
