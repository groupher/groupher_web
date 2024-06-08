import type { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TActive } from '@/spec'

import { Trans } from '@/i18n'
import Icon from '@/widgets/Menu/Icon'

import type { TActiveCondition, TMenuItem } from './spec'

import { Wrapper, Hint, LabelWrapper, StateTitle } from './styles/active_label'

type TProps = {
  condition: TActiveCondition
  title: string
  activeItem: TMenuItem
} & TActive

const ActiveLabel: FC<TProps> = ({ title, condition, activeItem }) => {
  // const $active = condition && condition !== ARTICLE_STATE.ALL
  const $active = !!condition

  return (
    <Wrapper>
      <Hint>{title}</Hint>
      <LabelWrapper>
        {activeItem && <Icon type={activeItem.icon} $active={$active} />}
        <StateTitle>{Trans(condition)}</StateTitle>
      </LabelWrapper>
    </Wrapper>
  )
}

export default observer(ActiveLabel)
