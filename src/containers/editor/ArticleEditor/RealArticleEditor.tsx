/*
 * ArticleEditor
 */

import { FC } from 'react'

import type { TEditMode } from '@/spec'
import { METRIC } from '@/constant'

import { buildLog } from '@/utils/logger'
import { bond } from '@/utils/mobx'

import ArchiveAlert from '@/widgets/ArchiveAlert'
import TagsList from '@/widgets/TagsList'
import NoticeBar from '@/widgets/NoticeBar'

import CommunityTagSetter from '@/containers/tool/CommunityTagSetter'
import RichEditor from '@/containers/editor/RichEditor'

import TitleInput from './TitleInput'
import AddOn from './AddOn'
import Footer from './Footer'

// import PublishRules from './PublishRules'

// import Settings from './Settings'

import type { TProps } from './index'
import { Wrapper, InnerWrapper, ContentWrapper } from './styles'
import { useInit, editOnChange, changeCommunity, onTagSelect } from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleEditor')

const ArticleEditorContainer: FC<TProps> = ({
  testid = 'article-editor',
  articleEditor: store,
  metric = METRIC.ARTICLE_EDITOR,
}) => {
  useInit(store)
  const {
    isArchived,
    archivedAt,
    mode,
    communityData,
    submitState,
    tagsData,
    texts,
    thread,
    editData,
    viewingArticle,
    allowEdit,
  } = store

  const { meta } = viewingArticle
  const { title, body } = editData

  const initEditor = mode === 'publish' || body !== '{}'

  return (
    <Wrapper testid={testid}>
      <InnerWrapper metric={metric}>
        {communityData.id && (
          <CommunityTagSetter
            selectedCommunity={communityData}
            onCommunitySelect={changeCommunity}
            onTagSelect={onTagSelect}
          />
        )}
        <ContentWrapper>
          {!allowEdit && (
            <NoticeBar
              type="notice"
              content="只有作者可以编辑本内容。"
              left={25}
            />
          )}

          {isArchived && (
            <ArchiveAlert date={archivedAt} top={12} bottom={20} left={25} />
          )}
          <TitleInput title={title} placeholder={texts.holder.title} />

          <TagsList
            items={tagsData}
            size="medium"
            community={communityData}
            thread={thread}
            withSetter={mode === 'publish'}
          />

          {initEditor && (
            /* @ts-ignore */
            <RichEditor
              data={body}
              onChange={(v) => editOnChange(JSON.stringify(v), 'body')}
              addon={<AddOn thread={thread} editData={editData} />}
              placeholder={texts.holder.body}
            />
          )}
          <Footer
            mode={mode as TEditMode}
            editData={editData}
            submitState={submitState}
          />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default bond(ArticleEditorContainer, 'articleEditor') as FC<TProps>
