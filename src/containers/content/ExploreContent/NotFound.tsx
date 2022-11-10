import { FC, memo } from 'react'

import { ROUTE } from '@/constant'

import {
  Wrapper,
  EmptyCard,
  EmptyTitle,
  EmptyDesc,
  IssueLink,
} from './styles/not_found'

type TProps = {
  showSearchNote: boolean
}

const NotFound: FC<TProps> = ({ showSearchNote }) => {
  return (
    <Wrapper showSearchNote={showSearchNote}>
      <EmptyCard>
        <EmptyTitle>没有找到相关社区</EmptyTitle>
        <EmptyDesc>
          若没有你感兴趣的社区, 欢迎
          <IssueLink href={`/${ROUTE.APPLY_COMMUNITY}`} passHref>
            参与创建
          </IssueLink>
        </EmptyDesc>
      </EmptyCard>
    </Wrapper>
  )
}

export default memo(NotFound)
