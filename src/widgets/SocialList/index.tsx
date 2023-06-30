import { FC, memo } from 'react'

import type { TSizeTSM, TSocialItem, TSpace } from '@/spec'
import SIZE from '@/constant/size'

import { Wrapper, SocialWrapper, Icon } from './styles'

type TProps = {
  size?: TSizeTSM
  testid?: string
  selected?: TSocialItem[]
} & TSpace

const SocialList: FC<TProps> = ({
  testid = 'social-list',
  selected = [],
  size = SIZE.SMALL,
  ...restProps
}) => {
  return (
    <Wrapper testid={testid} size={size} {...restProps}>
      {selected.map((social) => {
        const SocialIcon = Icon[social.type]
        return (
          <SocialWrapper key={social.type} href={social.link} target="_blank">
            <SocialIcon />
          </SocialWrapper>
        )
      })}
    </Wrapper>
  )
}

export default memo(SocialList)
