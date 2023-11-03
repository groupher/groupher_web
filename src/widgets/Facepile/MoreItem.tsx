import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useAvatarLayout from '@/hooks/useAvatarLayout'

import type { TProps as TAvatarsProps } from '.'

// import RealNumber from './RealNumber'

import { Wrapper, TextMore, DotText } from './styles/more_item'

type TProps = Pick<TAvatarsProps, 'size' | 'onTotalSelect'>

const MoreItem: FC<TProps> = ({ size, onTotalSelect }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper size={size} onClick={() => onTotalSelect()}>
      <TextMore size={size} $avatarLayout={avatarLayout}>
        <DotText>..</DotText>
      </TextMore>
    </Wrapper>
  )
}

export default observer(MoreItem)
