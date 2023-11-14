import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TActive } from '@/spec'
import { ARTICLE_STATE } from '@/constant/gtd'

import { Trans } from '@/i18n'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TActiveCondition } from './spec'
import Icon from './Icon'

import { Wrapper, Hint, LabelWrapper, StateTitle } from './styles/active_label'

type TProps = {
  condition: TActiveCondition
  title: string
} & TActive

const ActiveLabel: FC<TProps> = ({ title, condition }) => {
  const $active = condition && condition !== ARTICLE_STATE.ALL
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <Hint>{title}</Hint>
      <LabelWrapper>
        <Icon condition={condition} $active={$active} $color={primaryColor} />
        <StateTitle>{Trans(condition)}</StateTitle>
      </LabelWrapper>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
