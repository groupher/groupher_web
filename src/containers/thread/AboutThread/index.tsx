/* *
 * AboutThread
 *
 */

import type { FC } from 'react'

import useViewingCommunity from '~/hooks/useViewingCommunity'
import useLayout from '~/hooks/useLayout'
import { BANNER_LAYOUT } from '~/const/layout'

import Markdown from '~/widgets/Markdown'
import { SexyDivider as Divider } from '~/widgets/Common'

import Members from './Members'
import BasicStates from './BasicStates'

import ExtraInfo from './ExtraInfo'
import Sidebar from './Sidebar'

import { Wrapper, MainWrapper, StateBlock, IntroBlock, MemberBlock, Title, Desc } from './styles'

type TProps = {
  testid?: string
  isSidebarLayout?: boolean
}

const INTRO = `我注意到里面他说了一句话，是这个老兄说一会我们的大使也有问题要问您，也就是说这个节目里印度的大使是在场的。
也就是说这个主持人所表达的意思，印度大使全听见了，并且是默许认可的。可以说也就是大使想说的话，也就是说这也代表了印度官方的态度。
只是由一个主持人代为说了出来。这其实很有启发，就是说将来我们的驻美大使是不是也可以采取这样的套路，
找一个懂媒体懂政治的学者在前面替自己怼人，自己默默坐在后面为学者的话背书。`

const AboutThreadContainer: FC<TProps> = ({ testid = 'about-thread', isSidebarLayout = false }) => {
  const { bannerLayout } = useLayout()
  const community = useViewingCommunity()

  return (
    <Wrapper $testid={testid} $bannerLayout={bannerLayout}>
      <MainWrapper $isSidebarLayout={isSidebarLayout}>
        <IntroBlock>
          <Title>社区简介</Title>
          <Desc>
            <Markdown>{INTRO}</Markdown>
          </Desc>
        </IntroBlock>

        {bannerLayout === BANNER_LAYOUT.SIDEBAR && <ExtraInfo />}

        <StateBlock>
          <Title>社区概况</Title>
          <BasicStates />
          <Divider bottom={40} top={60} />
        </StateBlock>

        <MemberBlock>
          <Members moderators={community.moderators} />
        </MemberBlock>
      </MainWrapper>
      {(bannerLayout === BANNER_LAYOUT.HEADER || bannerLayout === BANNER_LAYOUT.TABBER) && (
        <Sidebar />
      )}
    </Wrapper>
  )
}

export default AboutThreadContainer
