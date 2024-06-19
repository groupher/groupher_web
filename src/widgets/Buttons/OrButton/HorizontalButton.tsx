import type { FC } from 'react'

import SIZE from '@/const/size'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import type { TProps as TButtonProps } from '.'
import { Wrapper, LeftButton, OrSign, RightButton } from '../styles/or_button/horizontal_button'

type TProps = Omit<TButtonProps, 'direction'>

const HorizontalButton: FC<TProps> = ({
  onClick = console.log,
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

export default HorizontalButton
