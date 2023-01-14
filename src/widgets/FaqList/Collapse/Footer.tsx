import { FC, memo } from 'react'

import { Wrapper, Note, Bottom, BookIcon, PeopleIcon, LinkButton } from '../styles/collapse/footer'

const Footer: FC = () => {
  return (
    <Wrapper>
      <Note>没能解决你的问题？</Note>
      <Bottom>
        <LinkButton size="small" space={10}>
          <BookIcon />
          更多文档
        </LinkButton>
        <LinkButton size="small" ghost space={10}>
          <PeopleIcon />
          社区求助
        </LinkButton>
      </Bottom>
    </Wrapper>
  )
}

export default memo(Footer)
