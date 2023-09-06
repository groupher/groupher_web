import { FC } from 'react'

import ArrowLinker from '@/widgets/ArrowLinker'

import type { TStep } from '../../spec'
import { STEP } from '../../constant'

import {
  Wrapper,
  InnerWrapper,
  InnerWrapperColumn,
  Item,
  CheckIcon,
  ColumnItem,
  Dot,
  Header,
  Divider,
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
            域名对 SEO 有影响，请确保其和你的官方产品 / 服务相关联。
          </ColumnItem>
          <ColumnItem>
            <Dot />
            创建后域名不可随意修改。
          </ColumnItem>
          <ColumnItem>
            <Dot />
            如果你的产品 / 服务域名已被占用，请在
            <ArrowLinker href="/feedback" fontSize={14} left={1}>
              这里反馈
            </ArrowLinker>
            。
          </ColumnItem>
        </InnerWrapperColumn>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Header>
        <ArrowLinker href="/" left={-20}>
          自带丰富功能，查看完整特性
        </ArrowLinker>
        <Divider />
      </Header>

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
    </Wrapper>
  )
}

export default MaskPanel
