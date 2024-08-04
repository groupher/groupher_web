import type { FC } from 'react'

import { SexyDivider } from '~/widgets/Common'

import { Wrapper, AppStoreBar, MenuBar, Icon, Info, Platform, Title } from './styles/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      <AppStoreBar>
        <Icon.GooglePlay />
      </AppStoreBar>

      <AppStoreBar>
        <Icon.AppStore />
      </AppStoreBar>

      <SexyDivider top={8} bottom={6} />

      <MenuBar>
        <Icon.ChromeWebStore />
        <Info>
          <Platform>Chrome 应用商店</Platform>
          <Title>Groupher</Title>
        </Info>
        <div className="grow" />
        <Icon.Link />
      </MenuBar>

      <MenuBar>
        <Icon.Firefox />
        <Info>
          <Platform>火狐插件市场</Platform>
          <Title>Groupher</Title>
        </Info>
        <div className="grow" />
        <Icon.Link />
      </MenuBar>

      <MenuBar>
        <Icon.Github />
        <Info>
          <Platform>Github</Platform>
          <Title>Groupher</Title>
        </Info>
        <div className="grow" />
        <Icon.Link />
      </MenuBar>
    </Wrapper>
  )
}

export default Panel
