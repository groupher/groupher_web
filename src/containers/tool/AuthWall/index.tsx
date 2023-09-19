/* *
 * Subscriber
 *
 */

import { FC } from 'react'

// import { buildLog } from '@/utils/logger'
import { bond } from '@/mobx'

import { Br, Divider } from '@/widgets/Common'
import Modal from '@/widgets/Modal'

// import { BY } from './constant'
import type { TStore } from './store'
// import type { TBy } from './spec'

import {
  Wrapper,
  ByWrapper,
  IconWrapper,
  WeChatIcon,
  WeiboIcon,
  QQIcon,
  DoubanIcon,
  GithubIcon,
  TwitterIcon,
  GoogleIcon,
  FacebookIcon,
  IconTitle,
  IconBox,
} from './styles'

import { useInit, onClose } from './logic'

// const log = buildLog('C:Subscriber')

type TProps = {
  authWall?: TStore
  testid?: string
}

const AuthWallContainer: FC<TProps> = ({ authWall: store, testid = 'authWall' }) => {
  useInit(store)

  const { visible } = store

  return (
    <Modal
      show={visible}
      width="400px"
      onClose={onClose}
      showCloseBtn
      offsetTop="25%"
      mode="default"
    >
      <Wrapper testid={testid}>
        <h3>使用第三方账号登入</h3>
        <Br top={24} />
        <ByWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <WeChatIcon />
            </IconBox>
            <IconTitle>微信</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <WeiboIcon />
            </IconBox>
            <IconTitle>微博</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <QQIcon />
            </IconBox>
            <IconTitle>QQ</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <DoubanIcon />
            </IconBox>
            <IconTitle>豆瓣</IconTitle>
          </IconWrapper>

          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <GithubIcon />
            </IconBox>
            <IconTitle>Github</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <TwitterIcon />
            </IconBox>
            <IconTitle>Twitter</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <GoogleIcon />
            </IconBox>
            <IconTitle>Google</IconTitle>
          </IconWrapper>
          <IconWrapper onClick={() => console.log('change')}>
            <IconBox>
              <FacebookIcon />
            </IconBox>
            <IconTitle>Facebook</IconTitle>
          </IconWrapper>
        </ByWrapper>
        <Divider top={30} bottom={30} />
      </Wrapper>
    </Modal>
  )
}

export default bond(AuthWallContainer, 'authWall') as FC<TProps>
