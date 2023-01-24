import { FC, memo } from 'react'

import type { TAvatarLayout } from '@/spec'

import { AVATAR_LAYOUT } from '@/constant/layout'

import CheckLabel from '@/widgets/CheckLabel'

import { SETTING_FIELD } from '../constant'
import SectionLabel from '../SectionLabel'
import SavingBar from '../SavingBar'

import {
  Wrapper,
  SelectWrapper,
  Layout,
  LayoutTitle,
  Block,
  Divider,
  Avatar,
  AvatarList,
} from '../styles/ui/avatar_layout'
import { edit } from '../logic'

type TProps = {
  layout: TAvatarLayout
  isTouched: boolean
  saving: boolean
}

const AvatarLayout: FC<TProps> = ({ layout, isTouched, saving }) => {
  return (
    <Wrapper>
      <SectionLabel title="头像样式" desc={<>用户/用户列表头像展示样式。</>} />
      <SelectWrapper>
        <Layout onClick={() => edit(AVATAR_LAYOUT.SQUARE, 'avatarLayout')}>
          <Block $active={layout === AVATAR_LAYOUT.SQUARE}>
            <Avatar />
            <Divider />
            <AvatarList>
              <Avatar />
              <Avatar left="-5px" />
              <Avatar left="-5px" />
              <Avatar left="-5px" />
            </AvatarList>
          </Block>

          <LayoutTitle $active={layout === AVATAR_LAYOUT.SQUARE}>
            <CheckLabel
              title="圆角方形"
              $active={layout === AVATAR_LAYOUT.SQUARE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
        <Layout onClick={() => edit(AVATAR_LAYOUT.CIRCLE, 'avatarLayout')}>
          <Block $active={layout === AVATAR_LAYOUT.CIRCLE}>
            <Avatar circle />
            <Divider />
            <AvatarList>
              <Avatar circle />
              <Avatar left="-5px" circle />
              <Avatar left="-5px" circle />
              <Avatar left="-5px" circle />
            </AvatarList>
          </Block>

          <LayoutTitle $active={layout === AVATAR_LAYOUT.CIRCLE}>
            <CheckLabel
              title="圆形"
              $active={layout === AVATAR_LAYOUT.CIRCLE}
              top={15}
              left={-15}
            />
          </LayoutTitle>
        </Layout>
      </SelectWrapper>
      <SavingBar
        isTouched={isTouched}
        field={SETTING_FIELD.AVATAR_LAYOUT}
        loading={saving}
        top={20}
      />
    </Wrapper>
  )
}

export default memo(AvatarLayout)
