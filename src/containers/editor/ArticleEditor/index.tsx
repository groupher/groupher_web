/*
 * ArticleEditor
 */

import { type FC, useEffect } from 'react'

import type { TEditMode, TMetric } from '~/spec'
import METRIC from '~/const/metric'
import { CONDITION_MODE } from '~/const/mode'

// import RichEditor from '~/containers/editor/RichEditor'
import { Space } from '~/widgets/Common'
import ConditionSelector from '~/widgets/ConditionSelector'
import ArchiveAlert from '~/widgets/ArchiveAlert'
import NoticeBar from '~/widgets/NoticeBar'
import TagSelector from '~/widgets/TagSelector'

// import ArticleCover from './ArticleCover'

import TitleInput from './TitleInput'
import Footer from './Footer'

// import Settings from './Settings'
import useLogic from './useLogic'
import { Wrapper, InnerWrapper, ContentWrapper, FuncRow } from './styles'

type TProps = {
  metric?: TMetric
}

const ArticleEditor: FC<TProps> = ({ metric = METRIC.ARTICLE_EDITOR }) => {
  const {
    isArchived,
    archivedAt,
    mode,
    submitState,
    getGroupedTags,
    getEditData,
    allowEdit,
    activeCat,
    activeTag,
    onTagSelect,
    catOnChange,
    loadArticle,
    loadCommunity,
    articleTags,
  } = useLogic()

  useEffect(() => {
    loadCommunity()
  }, [])

  console.log('## articleTags: ', articleTags)

  useEffect(() => {
    if (mode === 'update') loadArticle()
  }, [mode])

  const groupedTags = getGroupedTags()
  const editData = getEditData()
  // const { title, body } = editData
  const { title } = editData

  const texts = {
    holder: {
      title: '// 帖子标题',
      body: "// 帖子内容（'Tab' 键插入富文本）",
    },
  }
  // const initEditor = mode === 'publish' || body !== '{}'

  return (
    <Wrapper>
      <InnerWrapper metric={metric}>
        <ContentWrapper>
          {!allowEdit && <NoticeBar type="notice" content="只有作者可以编辑本内容。" left={25} />}
          {isArchived && <ArchiveAlert date={archivedAt} top={12} bottom={20} left={25} />}

          {/* <ArticleCover /> */}
          <TitleInput title={title} placeholder={texts.holder.title} />
          <FuncRow>
            <ConditionSelector
              mode={CONDITION_MODE.CAT}
              closable={false}
              selected
              active={activeCat}
              onSelect={catOnChange}
              right={20}
            />
            <Space left={14} />
            <TagSelector groupedTags={groupedTags} activeTag={activeTag} onSelect={onTagSelect} />
          </FuncRow>

          {/* {initEditor && (
            <RichEditor
              data={body}
              onChange={(v) => editOnChange(JSON.stringify(v), 'body')}
              placeholder={texts.holder.body}
            />
          )} */}
          <Footer mode={mode as TEditMode} editData={editData} submitState={submitState} />
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

export default ArticleEditor
