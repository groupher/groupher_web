import { FC } from 'react'
import { observer } from 'mobx-react'

import SIZE from '@/constant/size'
import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TProps as TButtonProps } from '.'
import { Wrapper, LeftButton, OrSign, RightButton } from '../styles/or_button/horizontal_button'

const log = buildLog('w:HorizontalButton')

type TProps = Omit<TButtonProps, 'direction'>

const HorizontalButton: FC<TProps> = ({
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
    <Wrapper size={size}>
      <LeftButton
        size={size}
        active={group[0].key === activeKey}
        onClick={() => onClick(group[0].key)}
        $color={primaryColor}
      >
        {group[0].title}
      </LeftButton>
      <OrSign>or</OrSign>
      <RightButton
        size={size}
        active={group[1].key === activeKey}
        onClick={() => onClick(group[1].key)}
        $color={primaryColor}
      >
        {group[1].title}
      </RightButton>
    </Wrapper>
  )
}

export default observer(HorizontalButton)
