import { FC } from 'react'

import {
  Wrapper,
  BlocksWrapper,
  Block,
  ICON,
  Title,
} from '../../styles/feature_wall/security/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      <BlocksWrapper>
        <Block left={15}>
          <ICON.Lock />
          <Title>https加密</Title>
        </Block>
        <Block>
          <ICON.Global />
          <Title>自定义域名</Title>
        </Block>
        <Block>
          <ICON.Upload />
          <Title>导入导出</Title>
        </Block>
        <Block>
          <ICON.Hash />
          <Title>用户标签</Title>
        </Block>
        <Block>
          <ICON.Search />
          <Title>SEO</Title>
        </Block>
        <Block left={15}>
          <ICON.Auth />
          <Title>灵活权限</Title>
        </Block>
        <Block>
          <ICON.Cloud />
          <Title>私有部署</Title>
        </Block>
      </BlocksWrapper>
    </Wrapper>
  )
}

export default Panel
