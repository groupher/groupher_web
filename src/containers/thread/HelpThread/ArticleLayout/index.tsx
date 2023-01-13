import { FC, memo, useState } from 'react'

import FileTree from '@/widgets/FileTree'
import { Space } from '@/widgets/Common'
import FeedbackFooter from '@/widgets/FeedbackFooter'
import Sticky from '@/widgets/Sticky'
import CustomScroller from '@/widgets/CustomScroller'

import PinedTree from './PinedTree'
import FaqLayout from '../FaqLayout'
import NaviHead from './NaviHead'
import ArticleCover from './ArticleCover'

import ToggleBtn from './ToggleBtn'

import { Wrapper, Header, Title, Content, Sidebar, TreeWrapper } from '../styles/article_layout'
import { gotoDetailLayout } from '../logic'

type TProps = {
  testid?: string
  isFAQArticleLayout: boolean
}

const ArticleLayout: FC<TProps> = ({ testid = 'ArtileLayout', isFAQArticleLayout }) => {
  const [filetreeOpen, setFileTreeOpen] = useState(true)

  return (
    <Wrapper>
      <ToggleBtn open={filetreeOpen} onToggle={(toggle) => setFileTreeOpen(toggle)} />

      <Sidebar isLeftLayout open={filetreeOpen}>
        <Sticky offsetTop={30}>
          <PinedTree />
          <TreeWrapper>
            <CustomScroller
              direction="vertical"
              height="calc(100vh - 110px)"
              barSize="small"
              showShadow={false}
            >
              <FileTree onSelect={() => gotoDetailLayout()} left={18} />
            </CustomScroller>
          </TreeWrapper>
        </Sticky>
      </Sidebar>
      <Space right={80} />
      <Content isRightLayout open={filetreeOpen}>
        <Header>
          {!isFAQArticleLayout && <NaviHead />}
          {!isFAQArticleLayout && <Title>关于帮助台的使用</Title>}
          <ArticleCover />
        </Header>

        {isFAQArticleLayout ? (
          <FaqLayout />
        ) : (
          <>
            <div>
              巴西内马尔积极在禁区外围游走，但是双方传控始终胶着，球不到禁区就被截断了。个人感觉巴西实力更强，但上半场要我说，克罗地亚打的更好。
            </div>
            <br />
            <div>
              Moving to the slightly larger 512-byte messages, we can see the total throughput seems
              to drop for each individual client, but fRPC is still comfortably 2-3x faster than
              gRPC is. In the case of 8192 connected clients, fRPC’s throughput is still 98
              RPCs/second while gRPC drops to only 29.
            </div>

            <br />
            <div>
              伊朗是民众思想开放 但政府是保守的神棍 民众很多对宗教不感冒 不想围头巾 想喝酒
              过世俗的生活 自然会抗争 而且伊朗本身就有较大的社会矛盾
            </div>
            <br />
            <div>
              To make sure our benchmark is fair, we’ll be using the exact same proto3 file as the
              input for both fRPC and gRPC. Moreover, we’ll be using the exact same service
              implementation for both the gRPC and fRPC servers - the generated service interfaces
              in fRPC are designed to look the same as in gRPC, so using the same service
              implementation is extremely simple.
            </div>
          </>
        )}
        <FeedbackFooter top={60} />
      </Content>
    </Wrapper>
  )
}

export default memo(ArticleLayout)
