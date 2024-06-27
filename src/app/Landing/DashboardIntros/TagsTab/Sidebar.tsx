import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'
import { Brick } from '~/widgets/Common'
import { Wrapper, TagItem, TagIcon, TagTitle } from '../../styles/dashboard_intros/tags_tab/sidebar'

const Sidebar: FC = () => {
  return (
    <Wrapper>
      <Brick $width={80} $height={7} $opacity={0.08} left={0} top={5} />
      <Brick $width={50} $height={7} $opacity={0.05} left={0} top={20} />
      <Brick $width={50} $height={7} $opacity={0.04} left={2} top={210} />

      <TagItem>
        <TagIcon />
        <TagTitle>iOS</TagTitle>
      </TagItem>

      <TagItem>
        <TagIcon />
        <TagTitle>Web</TagTitle>
      </TagItem>

      <TagItem>
        <TagIcon />
        <TagTitle>Android</TagTitle>
      </TagItem>

      <TagItem $active>
        <TagIcon $color={COLOR_NAME.GREEN} $active />
        <TagTitle>使用分享</TagTitle>
      </TagItem>

      <TagItem>
        <TagIcon />
        <TagTitle>安全性</TagTitle>
      </TagItem>

      <TagItem>
        <TagIcon />
        <TagTitle>安装部署</TagTitle>
      </TagItem>
    </Wrapper>
  )
}

export default Sidebar
