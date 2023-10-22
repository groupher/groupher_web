import { FC } from 'react'
import { observer } from 'mobx-react'

import useAvatarLayout from '@/hooks/useAvatarLayout'

import type { TProps as TAvatarsProps } from '.'

// import RealNumber from './RealNumber'

import { Wrapper, TextMore, DotText } from './styles/more_item'

type TProps = Pick<TAvatarsProps, 'size' | 'total' | 'onTotalSelect'>

const MoreItem: FC<TProps> = ({ size, total, onTotalSelect }) => {
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper size={size} onClick={() => onTotalSelect()}>
      <TextMore size={size} total={total} avatarLayout={avatarLayout}>
        <DotText>..</DotText>
      </TextMore>
    </Wrapper>
  )
}

export default observer(MoreItem)
