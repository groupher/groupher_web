import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import SIZE from '@/constant/size'
import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TProps as TButtonProps } from '.'
import { Wrapper, UpButton, OrSign, BottomButton } from '../styles/or_button/vertical_button'

const log = buildLog('w:VericalButton')

type TProps = Omit<TButtonProps, 'direction'>

const VerticalButton: FC<TProps> = ({
  onClick = log,
  size = SIZE.SMALL,
  activeKey,
  group = [
    {
      key: 'hello',
      title: 'hello',
    },
    {
      key: 'cps',
      title: 'cps',
    },
  ],
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Wrapper>
      <UpButton
        size={size}
        active={group[0].key === activeKey}
        onClick={() => onClick(group[0].key)}
        $color={primaryColor}
      >
        {group[0].title}
      </UpButton>
      <OrSign>or</OrSign>
      <BottomButton
        size={size}
        active={group[1].key === activeKey}
        onClick={() => onClick(group[1].key)}
        $color={primaryColor}
      >
        {group[1].title}
      </BottomButton>
    </Wrapper>
  )
}

export default observer(VerticalButton)
