import { FC, memo } from 'react'
import { isEmpty } from 'ramda'

import { Row, SpaceGrow } from '@/widgets/Common'

import Favicon from './Favicon'

import type { TCommunityType } from '../../spec'

import {
  Header,
  Tab,
  TabContent,
  AddressBar,
  ToolbarWrapper,
  BackIcon,
  RefreshIcon,
  ForwardIcon,
  LockIcon,
  MoreIcon,
  StarIcon,
  Form,
  Input,
  Slash,
  SubDomain,
  ThreadPath,
  ThreadText,
} from '../../styles/content/fake_browser/browser_head'

type TProps = {
  domain?: string
  title?: string
  desc?: string
  activePath: string
  logo?: string | null
  communityType?: TCommunityType
}

const BrowserHead: FC<TProps> = ({
  domain = '',
  title = '',
  desc = '',
  activePath = '',
  logo = null,
  communityType = null,
}) => {
  const tabTitle = title || domain || 'groupher'

  return (
    <>
      <Header>
        <Tab>
          <Favicon title={title} logo={logo} />
          <TabContent>{tabTitle}</TabContent>
        </Tab>
      </Header>
      <AddressBar>
        <ToolbarWrapper>
          <BackIcon />
          <ForwardIcon />
          <RefreshIcon />
        </ToolbarWrapper>
        <Form>
          <LockIcon />
          <Input>
            {isEmpty(domain) ? (
              <div>groupher.com</div>
            ) : (
              <Row>
                groupher.com<Slash>/</Slash>
                <SubDomain>{domain.toLowerCase()}</SubDomain>
                <ThreadPath $active={!!activePath}>
                  <Slash>/</Slash>
                  <ThreadText>{activePath}</ThreadText>
                </ThreadPath>
              </Row>
            )}
            <SpaceGrow />
            <StarIcon />
          </Input>
        </Form>
        <MoreIcon />
      </AddressBar>
    </>
  )
}

export default memo(BrowserHead)
