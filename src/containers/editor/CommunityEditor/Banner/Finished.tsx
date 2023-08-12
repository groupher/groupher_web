/* eslint-disable jsx-a11y/accessible-emoji */
import { FC, memo, useEffect } from 'react'

import Button from '@/widgets/Buttons/Button'
import { confetti } from 'tsparticles-confetti'

import { Wrapper, Title, Desc, Footer, DashboardIcon } from '../styles/banner/finished'

// import type { TSetupDomainStatus, TValidState } from '../spec'

const Finished: FC = () => {
  const tada = () => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
    }

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 1.2,
        shapes: ['circle', 'square', 'heart'],
        colors: ['#F8D678', '#F5C5C8', '#BDA3F0', '#C9D8FD', '#DCF8FD'],
      })

      confetti({
        ...defaults,
        particleCount: 20,
        scalar: 1.8,
        shapes: ['text'],
        shapeOptions: {
          text: {
            value: ['🦄', '🌈'],
          },
        },
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
  }

  useEffect(() => {
    tada()
  }, [])

  return (
    <Wrapper>
      <Title onClick={() => tada()}>👏🏻 &nbsp;&nbsp;感谢你的信任</Title>
      <Desc>申请处理中，在此之前你可以去管理后台完善社区设置</Desc>
      <Footer>
        <Button ghost>社区主页</Button>
        <Button>
          <DashboardIcon />
          管理后台
        </Button>
      </Footer>
    </Wrapper>
  )
}

export default memo(Finished)
