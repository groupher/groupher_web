import { FC, useState } from 'react'
import { update } from 'ramda'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import type { TLinkItem } from '@/spec'

import { sortByIndex } from '@/utils/helper'

import SocialEditor from '@/widgets/SocialEditor'

import BrandInfo from './BrandInfo'
import LinkEditor from './LinkEditor'

import {
  Wrapper,
  Title,
  LeftWrapper,
  CenterWrapper,
  RightWrapper,
} from '../../styles/footer/editors/simple'

const LINKS = [
  {
    index: 0,
    raw: '0',
    title: 'title 1',
    addr: 'https://groupher.com/1',
  },

  {
    index: 3,
    raw: '3',
    title: 'title 2',
    addr: 'https://groupher.com/1',
  },

  {
    index: 5,
    raw: '5',
    title: 'title 3',
    addr: 'https://groupher.com/1',
  },

  {
    index: 7,
    raw: '7',
    title: 'title 4',
    addr: 'https://groupher.com/1',
  },
]

const Simple: FC = () => {
  const [links, setLinks] = useState(LINKS)

  const [parent] = useAutoAnimate({ duration: 220 })

  return (
    <Wrapper>
      <LeftWrapper>
        <BrandInfo />
      </LeftWrapper>
      <CenterWrapper ref={parent}>
        <Title
          onClick={() => {
            setLinks(
              update(
                1,
                {
                  index: 6,
                  raw: '6',
                  title: 'title 6',
                  addr: 'https://groupher.com/1',
                },
                links,
              ),
            )

            /*
            setLinks([
              ...links,
              {
                index: 4,
                title: 'title 5',
                addr: 'https://groupher.com/1',
              },
            ])
                         */
          }}
        >
          链接
        </Title>
        {sortByIndex(links).map((item) => (
          <LinkEditor key={item.index} linkItem={item as TLinkItem} />
        ))}
      </CenterWrapper>
      <RightWrapper>
        <Title>社交媒体</Title>
        <SocialEditor width="200px" withTitle={false} top={12} left={-5} />
      </RightWrapper>
    </Wrapper>
  )
}

export default Simple
