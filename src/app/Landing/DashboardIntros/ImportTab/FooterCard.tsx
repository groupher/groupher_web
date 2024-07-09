import type { FC } from 'react'

import {
  Wrapper,
  ImCard,
  ImIcons,
  ToolIcons,
  // FooterNote,
  ImgIcon,
  OhterCard,
} from '../../styles/dashboard_intros/import_tab/footer_card'

const FooterCard: FC = () => {
  return (
    <Wrapper>
      <ImCard>
        <ImIcons>
          <ImgIcon src="landing/products/dingding.png" />
          <ImgIcon src="landing/products/feishu.png" $size={30} />
          <ImgIcon src="landing/seo/wechat2.png" $size={26} />
          <ImgIcon src="landing/products/slack.png" $size={22} />
          <ImgIcon src="landing/products/discord.png" $size={24} />
        </ImIcons>
        {/* <FooterNote>主流 IM 平台</FooterNote> */}
      </ImCard>
      <OhterCard>
        <ToolIcons>
          <ImgIcon src="landing/products/email.png" $size={26} />
          <ImgIcon src="landing/seo/rss.png" $size={25} />
          <ImgIcon src="landing/products/webhook.png" $size={20} />
        </ToolIcons>
        {/* <FooterNote>Mail / RSS / Webhook</FooterNote> */}
      </OhterCard>
    </Wrapper>
  )
}

export default FooterCard
