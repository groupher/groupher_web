import { FC } from 'react'

import {
  Wrapper,
  ImCard,
  ImIcons,
  OhterCard,
  Icon,
  ImgIcon,
  MDIcon,
  CVSIcon,
  ToolIcons,
  FooterNote,
} from '../../styles/dashboard_intros/import_tab/header_card'

const HeaderCard: FC = () => {
  return (
    <Wrapper>
      <ImCard>
        <ImIcons>
          <Icon.GITHUB />
          <ImgIcon src="landing/products/gitlab.png" $size={28} />
          <ImgIcon src="landing/products/notion.png" $size={26} />
          <ImgIcon src="landing/products/linear.png" $size={22} />
          <ImgIcon src="landing/products/jira.png" $size={20} />
        </ImIcons>
        <FooterNote>主流 issue 管理服务</FooterNote>
      </ImCard>
      <OhterCard>
        <ToolIcons>
          <MDIcon src="landing/products/markdown.png" />
          <CVSIcon src="landing/products/cvs.png" />
        </ToolIcons>
        <FooterNote>Markdown / CVS 导入</FooterNote>
      </OhterCard>
    </Wrapper>
  )
}

export default HeaderCard
