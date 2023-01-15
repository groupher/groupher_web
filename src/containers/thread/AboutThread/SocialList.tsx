import { FC, memo } from 'react'

import { DEME_SOCIALS } from '@/constant/social'

import { Wrapper, SocialWrapper, Icon, Title } from './styles/social_list'

const defaultItems = DEME_SOCIALS

type TProps = {
  items?: {
    iconSrc: string
    title: string
  }[]
}

const SocialList: FC<TProps> = ({ items = defaultItems }) => {
  return (
    <Wrapper>
      {items.map((item) => (
        <SocialWrapper key={item.title}>
          <Icon src={item.iconSrc} />
          <Title>{item.title}</Title>
        </SocialWrapper>
      ))}
    </Wrapper>
  )
}

export default memo(SocialList)
