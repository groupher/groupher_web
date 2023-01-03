import { FC, memo } from 'react'

import type { TSizeSM, TSocialType, TSpace } from '@/spec'

import { Wrapper, SocialWrapper, Icon } from './styles'

type TProps = {
  size?: TSizeSM
  testid?: string
  selected?: TSocialType[]
} & TSpace

const SocialList: FC<TProps> = ({ testid = 'social-list', selected = [], ...restProps }) => {
  return (
    <Wrapper testid={testid} {...restProps}>
      {selected.map((social) => {
        const SocialIcon = Icon[social]
        return (
          <SocialWrapper key={social}>
            <SocialIcon />
          </SocialWrapper>
        )
      })}
    </Wrapper>
  )
}

export default memo(SocialList)
