import { FC, memo } from 'react'

import { ICON } from '@/config'

import { changeToCommunity } from '@/utils/signal'

import {
  Wrapper,
  BodyWrapper,
  Entry,
  Logo,
  Intro,
  Title,
} from '../styles/more_panel/mobile_view'

const items = [
  {
    icon: `${ICON}/menu/ear.svg`,
    title: '建议反馈',
    target: 'feedback',
    raw: 30,
  },
]

const MoreContent: FC = () => {
  return (
    <Wrapper mobile>
      <BodyWrapper>
        {items.map((item, index) => (
          <Entry
            key={item.target}
            index={index}
            mobile
            onClick={() => {
              changeToCommunity(item.target)
            }}
          >
            <Logo src={item.icon} />
            <Intro>
              <Title>{item.title}</Title>
            </Intro>
          </Entry>
        ))}
      </BodyWrapper>
    </Wrapper>
  )
}

export default memo(MoreContent)
