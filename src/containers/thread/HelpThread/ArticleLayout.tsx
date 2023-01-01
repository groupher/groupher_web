import { FC, memo } from 'react'

import type { TFileTreeDirection } from '@/spec'

import FileTree from '@/widgets/FileTree'
import { Space, SpaceGrow } from '@/widgets/Common'
import FeedbackFooter from '@/widgets/FeedbackFooter'

import FaqLayout from './FaqLayout'
import ArticleHeadAction from './ArticleHeadAction'

import {
  Wrapper,
  Header,
  Navi,
  All,
  Slash,
  Cur,
  Title,
  Content,
  Sidebar,
  FAQItem,
} from './styles/article_layout'
import { back2Layout, gotoFAQDetailLayout, gotoDetailLayout } from './logic'

type TProps = {
  testid?: string
  isFAQArticleLayout: boolean
  fileTreeDirection: TFileTreeDirection
}

const ArticleLayout: FC<TProps> = ({
  testid = 'ArtileLayout',
  isFAQArticleLayout,
  fileTreeDirection,
}) => {
  return (
    <Wrapper>
      {fileTreeDirection === 'right' ? (
        <>
          <Content>
            <Header>
              {!isFAQArticleLayout && (
                <Navi>
                  <All onClick={() => back2Layout()}>全部</All>
                  <Slash>/</Slash>
                  <Cur>产品</Cur>
                </Navi>
              )}

              {!isFAQArticleLayout && <Title>关于帮助台的使用</Title>}
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
                  Moving to the slightly larger 512-byte messages, we can see the total throughput
                  seems to drop for each individual client, but fRPC is still comfortably 2-3x
                  faster than gRPC is. In the case of 8192 connected clients, fRPC’s throughput is
                  still 98 RPCs/second while gRPC drops to only 29.
                </div>

                <br />
                <div>
                  伊朗是民众思想开放 但政府是保守的神棍 民众很多对宗教不感冒 不想围头巾 想喝酒
                  过世俗的生活 自然会抗争 而且伊朗本身就有较大的社会矛盾
                </div>
                <br />
                <div>
                  To make sure our benchmark is fair, we’ll be using the exact same proto3 file as
                  the input for both fRPC and gRPC. Moreover, we’ll be using the exact same service
                  implementation for both the gRPC and fRPC servers - the generated service
                  interfaces in fRPC are designed to look the same as in gRPC, so using the same
                  service implementation is extremely simple.
                </div>
              </>
            )}
          </Content>
          <Sidebar>
            <FAQItem onClick={() => gotoFAQDetailLayout()}>常见问题</FAQItem>
            <FileTree onSelect={() => gotoDetailLayout()} />
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar isLeftLayout>
            <FAQItem onClick={() => gotoFAQDetailLayout()}>常见问题</FAQItem>
            <FileTree onSelect={() => gotoDetailLayout()} />
          </Sidebar>
          <Space right={96} />
          <Content isRightLayout>
            <Header>
              {!isFAQArticleLayout && (
                <Navi>
                  <All onClick={() => back2Layout()}>全部</All>
                  <Slash>/</Slash>
                  <Cur>产品</Cur>
                  <SpaceGrow />
                  <ArticleHeadAction />
                </Navi>
              )}
              {!isFAQArticleLayout && <Title>关于帮助台的使用</Title>}
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
                  Moving to the slightly larger 512-byte messages, we can see the total throughput
                  seems to drop for each individual client, but fRPC is still comfortably 2-3x
                  faster than gRPC is. In the case of 8192 connected clients, fRPC’s throughput is
                  still 98 RPCs/second while gRPC drops to only 29.
                </div>

                <br />
                <div>
                  伊朗是民众思想开放 但政府是保守的神棍 民众很多对宗教不感冒 不想围头巾 想喝酒
                  过世俗的生活 自然会抗争 而且伊朗本身就有较大的社会矛盾
                </div>
                <br />
                <div>
                  To make sure our benchmark is fair, we’ll be using the exact same proto3 file as
                  the input for both fRPC and gRPC. Moreover, we’ll be using the exact same service
                  implementation for both the gRPC and fRPC servers - the generated service
                  interfaces in fRPC are designed to look the same as in gRPC, so using the same
                  service implementation is extremely simple.
                </div>
              </>
            )}
            <FeedbackFooter top={60} />
          </Content>
        </>
      )}
    </Wrapper>
  )
}

export default memo(ArticleLayout)
