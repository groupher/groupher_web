import { FC, memo } from 'react'

import type { TSizeSM, TSocialItem, TSpace } from '@/spec'

import { Wrapper, SocialWrapper, Icon } from './styles'

type TProps = {
  size?: TSizeSM
  testid?: string
  selected?: TSocialItem[]
} & TSpace

const SocialList: FC<TProps> = ({ testid = 'social-list', selected = [], ...restProps }) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      {selected.map((social) => {
        const SocialIcon = Icon[social.type]
        return (
          <SocialWrapper key={social.type} href={social.addr} target="_blank">
            <SocialIcon />
          </SocialWrapper>
        )
      })}
    </Wrapper>
  )
}

export default memo(SocialList)
