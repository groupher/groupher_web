/*
 *
 * AuthorInfo
 *
 */

import { FC, memo, useState, useCallback } from 'react'

import type { TAccount, TAvatarLayout, TArticle } from '@/spec'
import SVG from '@/constant/svg'
import { buildLog } from '@/utils/logger'

import Tabs from '@/widgets/Switcher/Tabs'
import IconButton from '@/widgets/Buttons/IconButton'
import MenuButton from '@/widgets/Buttons/MenuButton'

import Activities from './Activities'
import Members from './Members'

import { TAB_ITEMS, TAB_ACTIVITIES, TAB_MEMBERS } from '../constant'
import { Wrapper, TabsWrapper, ReportWrapper, ContentWrapper } from '../styles/panel'

// import { onFollow, undoFollow } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('w:AuthorInfo:index')

type TProps = {
  testid?: string
  author: TAccount
  avatarLayout: TAvatarLayout
  article: TArticle
}

const menuOptions = [
  {
    key: 'report',
    icon: SVG.REPORT,
    title: '举报内容',
  },
]

const Panel: FC<TProps> = ({ testid = 'author-info', author, avatarLayout, article }) => {
  const [tab, setTab] = useState(TAB_ACTIVITIES)

  const handleMenu = useCallback((key) => setTab(key), [])

  return (
    <Wrapper testid={testid}>
      <TabsWrapper>
        <Tabs
          items={TAB_ITEMS}
          size="small"
          activeKey={tab}
          bottomSpace={5}
          onChange={(tab) => setTab(tab)}
        />
      </TabsWrapper>
      <ReportWrapper>
        <MenuButton options={menuOptions} onClick={(key) => handleMenu(key)}>
          <IconButton icon={SVG.MOREL_DOT} size={15} dimWhenIdle />
        </MenuButton>
      </ReportWrapper>
      <ContentWrapper>
        {tab === TAB_ACTIVITIES && <Activities avatarLayout={avatarLayout} />}
        {tab === TAB_MEMBERS && <Members avatarLayout={avatarLayout} article={article} />}
      </ContentWrapper>
    </Wrapper>
  )
}

export default memo(Panel)
