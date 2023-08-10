import { FC, memo } from 'react'
import { isEmpty } from 'ramda'

import { ICON_CMD } from '@/config'

import Favicon from './Favicon'
import Content from './Content'
import MaskPanel from './MaskPanel'

import type { TStep, TCommunityType } from '../../spec'

import {
  Wrapper,
  Header,
  Tab,
  TabContent,
  AddressBar,
  ToolbarWrapper,
  ToolIcon,
  LockIcon,
  Form,
  Input,
  DomainText,
} from '../../styles/content/fake_browser'

type TProps = {
  step: TStep
  domain?: string
  title?: string
  desc?: string
  logo?: string | null
  communityType?: TCommunityType
}

const FakeBrowser: FC<TProps> = ({
  step,
  domain = '',
  title = '',
  desc = '',
  logo = null,
  communityType = null,
}) => {
  const tabTitle = title || domain || 'groupher'

  return (
    <Wrapper>
      <Header>
        <Tab>
          <Favicon title={title} logo={logo} />
          <TabContent>{tabTitle}</TabContent>
        </Tab>
      </Header>
      <AddressBar>
        <ToolbarWrapper>
          <ToolIcon src={`${ICON_CMD}/new_community/back.svg`} />
        </ToolbarWrapper>
        <ToolbarWrapper>
          <ToolIcon src={`${ICON_CMD}/new_community/back.svg`} reverse />
        </ToolbarWrapper>
        <ToolbarWrapper>
          <ToolIcon src={`${ICON_CMD}/new_community/refresh.svg`} />
        </ToolbarWrapper>
        <Form>
          <ToolbarWrapper>
            <LockIcon src={`${ICON_CMD}/new_community/lock.svg`} />
          </ToolbarWrapper>
          <Input>
            {isEmpty(domain) ? (
              <div>groupher.com</div>
            ) : (
              <div>
                groupher.com/<DomainText>{domain.toLowerCase()}</DomainText>
              </div>
            )}
          </Input>
          <ToolbarWrapper>
            <ToolIcon src={`${ICON_CMD}/new_community/star.svg`} />
          </ToolbarWrapper>
        </Form>
        <ToolbarWrapper>
          <ToolIcon src={`${ICON_CMD}/new_community/more.svg`} />
        </ToolbarWrapper>
      </AddressBar>
      <Content
        step={step}
        title={title}
        desc={desc}
        logo={logo}
        domain={domain}
        communityType={communityType}
      />
      <MaskPanel step={step} />
    </Wrapper>
  )
}

export default memo(FakeBrowser)
