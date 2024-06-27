/*
 *
 * ChangelogItem
 *
 */

import { type FC, memo } from 'react'

import type { TChangelog } from '~/spec'

import { previewArticle } from '~/signal'
import { THREAD } from '~/const/thread'
import useViewingCommunity from '~/hooks/useViewingCommunity'

import { SpaceGrow } from '~/widgets/Common'
import CoverImage from '~/widgets/CoverImage'
import EmotionSelector from '~/widgets/EmotionSelector'
import CommentsCount from '~/widgets/CommentsCount'
import ReadableDate from '~/widgets/ReadableDate'

import { demoTags, demoEmotion } from '../constant'

import SolidTagList from '../SolidTagList'
import Author from './Author'

import {
  Wrapper,
  Main,
  Title,
  TagsWrapper,
  Body,
  Footer,
  Version,
  DateTime,
  ShareIcon,
} from '../styles/classic_layout/article_layout'

type TProps = {
  testid?: string
  article: TChangelog
}

const ClassicLayout: FC<TProps> = ({ testid = 'changelog-item', article }) => {
  const { slug } = useViewingCommunity()

  return (
    <Wrapper $testid={testid}>
      <Main>
        <CoverImage />
        <Title
          href={`/${slug}/${THREAD.CHANGELOG}/${article.innerId}`}
          onClick={(e) => {
            e.preventDefault()
            previewArticle(article)
          }}
        >
          {article.title}
          <Version>v3.21</Version>
        </Title>
        <TagsWrapper>
          <SolidTagList tags={demoTags} />
          <DateTime>
            <ReadableDate date={article.insertedAt} withTime={false} />
          </DateTime>
        </TagsWrapper>
        <Body>
          这次俄乌冲突出现侮辱乌女性的评论就是1450干的，刷完评论就截图转发外网，成为外媒攻击中国人的“口实”。
          这种行为十分危险，战争期间各种武装组织骚动，随时对我国在乌克兰撤侨的6000人直接造成生命威胁。前段时间，刘学州那个找爸妈的孩子，也是被1450它们网暴死的。
          （1450罪恶滔天啊！1450是九世恶人下凡！连孩子都不放过。
        </Body>
        <Author user={article.author} />
        <Footer>
          <EmotionSelector emotions={demoEmotion} isLegal />
          <SpaceGrow />
          <CommentsCount count={article.commentsCount} size="medium" right={15} />
          <ShareIcon />
        </Footer>
      </Main>
    </Wrapper>
  )
}

export default memo(ClassicLayout)
