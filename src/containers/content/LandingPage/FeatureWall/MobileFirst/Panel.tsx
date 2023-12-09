import { FC } from 'react'

import {
  Wrapper,
  Phone,
  BlocksWrapper,
  Block,
  AndroidIcon,
  QRCodeSolidIcon,
  WechatIcon,
  ShareIcon,
} from '../../styles/feature_wall/mobile_first/panel'

const Panel: FC = () => {
  return (
    <Wrapper>
      <Phone>
        <div>手机端内容</div>
      </Phone>
      <BlocksWrapper>
        <Block />
        <Block $solid>
          <QRCodeSolidIcon />
        </Block>
        <Block $solid>
          <AndroidIcon />
        </Block>
        <Block $solid>
          <WechatIcon />
        </Block>
        <Block />
        <Block />
        <Block />
        <Block $solid>
          <ShareIcon />
        </Block>
        <Block />
      </BlocksWrapper>
    </Wrapper>
  )
}

export default Panel
