import { type FC, memo, useState } from 'react'

import { signIn } from '@/oauth'
import { titleCase } from '@/fmt'

import useTrans from '@/hooks/useTrans'
import Modal from '@/widgets/Modal'
import { SlientLink } from '@/widgets/Common'

import { OAUTH_PROVIDERS } from './constant'
import Loading, { LoadingMask } from './Loading'

import { Wrapper, Header, Body, SocialItem, IconBox, SocialIcon, Footer } from './styles/panel'

type TProps = {
  show: boolean
  onClose: () => void
}

const Panel: FC<TProps> = ({ show, onClose }) => {
  const [loadingProvider, setLoadingProvider] = useState(null)
  const { t } = useTrans()

  return (
    <Modal show={show} width="400px" onClose={() => onClose()} showCloseBtn>
      <Wrapper>
        {loadingProvider && (
          <>
            <LoadingMask />
            <Loading provider={loadingProvider} />
          </>
        )}
        <Header>{t('login.with.social')}</Header>
        <Body>
          {OAUTH_PROVIDERS.map((provider) => {
            const providerKey = titleCase(provider)
            const Icon = SocialIcon[providerKey] || null

            return (
              <SocialItem
                key={provider}
                onClick={() => {
                  signIn('github')
                  setLoadingProvider(providerKey)
                }}
              >
                <IconBox>
                  <Icon />
                </IconBox>
                {providerKey}
              </SocialItem>
            )
          })}
        </Body>
        <Footer>
          <SlientLink href="/">{t('login.bind.hint')}</SlientLink>
          <SlientLink href="/">{t('need.help')}</SlientLink>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

export default memo(Panel)
