import { FC } from 'react'

// import { Br } from '@/widgets/Common'
// import Tooltip from '@/widgets/Tooltip'

import type { TProps as TAvatarsProps } from './index'

// import RealNumber from './RealNumber'

import { Wrapper, TextMore, DotText } from './styles/more_item'

type TProps = Pick<
  TAvatarsProps,
  'size' | 'total' | 'showTotalNumber' | 'onTotalSelect' | 'avatarLayout'
>

const MoreItem: FC<TProps> = ({ size, total, onTotalSelect, showTotalNumber, avatarLayout }) => {
  return (
    <Wrapper size={size} onClick={() => onTotalSelect()}>
      <TextMore size={size} total={total} avatarLayout={avatarLayout}>
        <DotText>..</DotText>
      </TextMore>
    </Wrapper>
  )
}

export default MoreItem
