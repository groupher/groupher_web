import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import type { TStep } from '../../spec'
import { STEP } from '../../constant'

import {
  Wrapper,
  InnerWrapper,
  InnerWrapperColumn,
  Item,
  CheckIcon,
  TheLink,
  ColumnItem,
  Dot,
  Footer,
} from '../../styles/content/fake_browser/mask_panel'

type TProps = {
  step: TStep
}

const MaskPanel: FC<TProps> = ({ step }) => {
  if (step === STEP.SETUP_DOMAIN) {
    return (
      <Wrapper>
        <InnerWrapperColumn>
          <ColumnItem>
            <Dot />
            域名和 SEO 相关联，请确保其和产品 / 服务相关联。
          </ColumnItem>
          <ColumnItem>
            <Dot />
            创建后域名不可随意修改。
          </ColumnItem>
          <ColumnItem>
            <Dot />
            如果你的产品 / 服务域名已被占用，请在<TheLink href="/feedback">这里反馈</TheLink>。
          </ColumnItem>
        </InnerWrapperColumn>
      </Wrapper>
    )
  }

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