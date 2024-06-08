import type { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'
import {
  Wrapper,
  Title,
  Desc,
  Header,
  Url,
  Logo,
} from '../../styles/dashboard_intros/seo_tab/article_card'

const ArticleCard: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Logo src="/landing/seo/wechat.png" $size={15} />
        <Logo src="/landing/seo/zhihu.png" $size={15} />
        <Logo src="/landing/seo/xhs.png" $size={17} top={1} />
        <Logo src="/landing/seo/medium.png" $size={15} />
        <Logo src="/landing/seo/discord.png" $size={15} />
        <Logo src="/landing/seo/tg.png" $size={15} />
        <SpaceGrow />
      </Header>
      <Title>Motojie - (摩界)</Title>
      <Desc>发现复古摩托车的魅力。我们专注于提供全球最独特...</Desc>
      <Url>https://motojie.com</Url>
    </Wrapper>
  )
}

export default ArticleCard
