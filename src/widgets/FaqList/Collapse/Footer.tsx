import { type FC, memo } from 'react'

import {
  Wrapper,
  Note,
  Bottom,
  BookIcon,
  PeopleIcon,
  MoreButton,
  AskButton,
} from '../styles/collapse/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <Note>没能解决你的问题？</Note>
      <Bottom>
        <MoreButton size="small" space={10}>
          <BookIcon />
          更多文档
        </MoreButton>
        <AskButton size="small" ghost space={10}>
          <PeopleIcon />
          社区求助
        </AskButton>
      </Bottom>
    </Wrapper>
  )
}

export default memo(Footer)
