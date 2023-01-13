import { FC } from 'react'
import { Parallax } from 'react-scroll-parallax'

import { COLOR_NAME } from '@/constant'

import { Wrapper, Card, Avatar, Title } from '../styles/feature_wall/user_voice'
import { TColorName } from '@/spec'

type TVoiceCard = {
  color: TColorName
  text: string
  uname: string
}

const VoiceCard: FC<TVoiceCard> = ({ color, text, uname }) => {
  return (
    <Card>
      <Avatar color={color}>{uname}</Avatar>
      <Title>{text}</Title>
    </Card>
  )
}

const UserVoice: FC = () => {
  const speed = 10

  return (
    <Wrapper>
      <Parallax speed={speed} rotate={[8, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="提了一个需求" />
      </Parallax>

      <Parallax speed={speed} rotate={[3, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.PURPLE} uname="MV" text="发现一个 Bug" />
      </Parallax>
      <Parallax speed={speed} rotate={[-5, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.RED} uname="MJ" text="想投票给一个功能" />
      </Parallax>
      <Parallax speed={speed} rotate={[-4, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="使用有点疑惑" />
      </Parallax>
      <Parallax speed={speed} rotate={[6, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.BLUE} uname="XY" text="想看其他用户的看法" />
      </Parallax>
      <Parallax speed={speed} rotate={[8, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="好奇未来规划" />
      </Parallax>
      <Parallax speed={speed} rotate={[-4, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.PURPLE} uname="TY" text="遇到同样的问题" />
      </Parallax>
      <Parallax speed={speed} rotate={[3, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.RED} uname="CT" text="新功能是否有排期？" />
      </Parallax>
      <Parallax speed={speed} rotate={[-5, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.BROWN} uname="XY" text="想知道 Bug 何时修复" />
      </Parallax>
      <Parallax speed={speed} rotate={[5, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.GREEN} uname="XY" text="好奇官方有哪些新通告" />
      </Parallax>
      <Parallax speed={speed} rotate={[-5, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.PINK} uname="XY" text="需要之前发布的某个版本" />
      </Parallax>
      <Parallax speed={speed} rotate={[6, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.PURPLE} uname="RU" text="有什么攻略彩蛋？" />
      </Parallax>
      <Parallax speed={speed} rotate={[-4, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.BLUE} uname="WT" text="想分享使用心得" />
      </Parallax>
      <Parallax speed={speed} rotate={[7, 0]} translateY={[0, 0]}>
        <VoiceCard color={COLOR_NAME.CYAN} uname="QE" text="想找到组织" />
      </Parallax>
    </Wrapper>
  )
}

export default UserVoice
