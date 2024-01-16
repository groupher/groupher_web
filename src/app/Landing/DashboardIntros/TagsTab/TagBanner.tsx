import { FC } from 'react'

import {
  Wrapper,
  Header,
  HashTagIcon,
  Title,
  Desc,
} from '../../styles/dashboard_intros/tags_tab/tag_barnner'

const TagBanner: FC = () => {
  return (
    <Wrapper>
      <Header>
        <HashTagIcon />
        <Title>使用分享</Title>
      </Header>
      <Desc>这里搜集各位亲们的日常使用分享、实用技巧以及攻略等，Have fun !</Desc>
    </Wrapper>
  )
}

export default TagBanner
