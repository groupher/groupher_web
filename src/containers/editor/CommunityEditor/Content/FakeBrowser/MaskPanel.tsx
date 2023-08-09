import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import {
  Wrapper,
  InnerWrapper,
  Item,
  CheckIcon,
  Footer,
} from '../../styles/content/fake_browser/mask_panel'

const MaskPanel: FC = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Item>
          <CheckIcon />
          反馈分类管理
        </Item>
        <Item>
          <CheckIcon />
          功能投票 & 看板
        </Item>
        <Item>
          <CheckIcon />
          富文本内容
        </Item>
        <Item>
          <CheckIcon />
          团队管理员
        </Item>
        <Item>
          <CheckIcon />
          外观个性化设置
        </Item>
        <Item>
          <CheckIcon />
          SEO 优化
        </Item>
        <Item>
          <CheckIcon />
          页头页脚自定义
        </Item>
        <Item>
          <CheckIcon />
          评论表情反馈
        </Item>
        <Item>
          <CheckIcon />
          丰富第三方集成
        </Item>
      </InnerWrapper>
      <Footer>
        <ArrowButton>更多社区特性</ArrowButton>
      </Footer>
    </Wrapper>
  )
}

export default MaskPanel
