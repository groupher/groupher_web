import { FC, memo, useState } from 'react'

import { signIn } from '@/oauth'
import { titleCase } from '@/fmt'

import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'

import Modal from '@/widgets/Modal'
import { SlientLink } from '@/widgets/Common'

import { Wrapper, Header, Body, SocialItem, IconBox, SocialIcon, Footer } from './styles/panel'
import { OAUTH_PROVIDERS } from './constant'

type TProps = {
  show: boolean
  onClose: () => void
}

const Panel: FC<TProps> = ({ show, onClose }) => {
  const [loadingProviders, setLoadingProviders] = useState('')

  return (
    <Modal show={show} width="400px" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        <Header>使用你喜爱的第三方账号登入</Header>
        <Body>
          {OAUTH_PROVIDERS.map((provider) => {
            const providerKey = titleCase(provider)
            const Icon = SocialIcon[providerKey] || null

            return (
              <SocialItem
                key={provider}
                $inactive={loadingProviders !== '' && loadingProviders !== providerKey}
                onClick={() => {
                  signIn('github')
                  setLoadingProviders(providerKey)
                }}
              >
                <IconBox>
                  <Icon />
                </IconBox>
                {loadingProviders === providerKey ? (
                  <LavaLampLoading size="small" left={-4} />
                ) : (
                  <>{providerKey}</>
                )}
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
