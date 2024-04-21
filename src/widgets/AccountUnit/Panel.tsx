import { FC, memo } from 'react'

import { titleCase } from '@/utils/fmt'
import Modal from '@/widgets/Modal'
import { SlientLink } from '@/widgets/Common'

import { Wrapper, Header, Body, SocialItem, IconBox, SocialIcon, Footer } from './styles/panel'
import { OAUTH_PROVIDERS } from './constant'

type TProps = {
  show: boolean
  onClose: () => void
}

const Panel: FC<TProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} width="400px" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        <Header>使用你喜爱的第三方账号登入</Header>
        <Body>
          {OAUTH_PROVIDERS.map((provider) => {
            const providerKey = titleCase(provider)
            const Icon = SocialIcon[providerKey] || null

            return (
              <SocialItem key={provider}>
                <IconBox>
                  <Icon />
                </IconBox>
                {providerKey}
              </SocialItem>
            )
          })}
        </Body>
        <Footer>
          <SlientLink href="/">登入后可绑定其他账号</SlientLink>
          <SlientLink href="/">遇到问题？</SlientLink>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default memo(Panel)
