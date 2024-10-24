/*
 *
 * FriendsGallery
 *
 */

import { type FC, memo } from 'react'

import type { TID } from '~/spec'
import Linker from '~/widgets/Linker'

import {
  Wrapper,
  BlockWrapper,
  Block,
  Header,
  IntroHead,
  // Icon,
  HolderIcon,
  Title,
  LinkWrapper,
  ExchangeButton,
} from './styles/friends_gallery'

type TProps = {
  items: {
    id: TID
    title: string
    addr: string
    icon?: string
  }[]
}

const FriendsGallery: FC<TProps> = ({ items }) => {
  return (
    <Wrapper>
      <BlockWrapper>
        {items.map((item) => (
          <Block key={item.id}>
            <Header>
              <IntroHead>
                {/* <Icon src={item.icon} /> */}
                <HolderIcon />
                <Title>{item.title}</Title>
              </IntroHead>
            </Header>
            <LinkWrapper>
              <Linker src={item.addr} />
            </LinkWrapper>
          </Block>
        ))}
      </BlockWrapper>
      <ExchangeButton href="mailto:groupher@outlook.com?subject=交换友链" target="_blank">
        交换友链
      </ExchangeButton>
    </Wrapper>
  )
}

export default memo(FriendsGallery)
