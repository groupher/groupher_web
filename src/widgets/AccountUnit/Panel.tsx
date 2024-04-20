import { FC, memo } from 'react'

import Modal from '@/widgets/Modal'

import { Wrapper, Header, Body, SocialItem, IconBox, SocialIcon, Footer } from './styles/panel'

type TProps = {
  show: boolean
  onClose: () => void
}

const Panel: FC<TProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} width="480px" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        <Header>使用你喜爱的第三方账号登入</Header>
        <Body>
          <SocialItem>
            <IconBox>
              <SocialIcon.Google />
            </IconBox>
            Google
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Facebook />
            </IconBox>
            Facebook
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Twitter />
            </IconBox>
            Twitter
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Github />
            </IconBox>
            Github
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Google />
            </IconBox>
            Discord
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Facebook />
            </IconBox>
            Notion
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Twitter />
            </IconBox>
            Twitch
          </SocialItem>

          <SocialItem>
            <IconBox>
              <SocialIcon.Github />
            </IconBox>
            Line
          </SocialItem>
        </Body>
        <Footer>
          <div>Footer</div>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default memo(Panel)
