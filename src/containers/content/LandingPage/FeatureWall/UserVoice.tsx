import { FC } from 'react'

import { COLOR_NAME } from '@/constant'

import { Wrapper, Card, Avatar, Title } from '../styles/feature_wall/user_voice'
import { TColorName } from '@/spec'

type TVoiceCard = {
  color: TColorName
  text: string
  uname: string
  angle?: number
}

const VoiceCard: FC<TVoiceCard> = ({ color, text, uname, angle = 0 }) => {
  return (
    <Card angle={angle}>
      <Avatar color={color}>{uname}</Avatar>
      <Title>{text}</Title>
    </Card>
  )
}

type TProps = {
  arrange: boolean
}

const UserVoice: FC<TProps> = ({ arrange }) => {
  return (
    <Wrapper>
      <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="提了一个需求" angle={arrange ? 0 : 2} />
      <VoiceCard color={COLOR_NAME.PURPLE} uname="MV" text="发现一个 Bug" angle={arrange ? 0 : 2} />
      <VoiceCard
        color={COLOR_NAME.RED}
        uname="MJ"
        text="想投票给一个功能"
        angle={arrange ? 0 : -3}
      />
      <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="使用有点疑惑" angle={arrange ? 0 : 2} />
      <VoiceCard
        color={COLOR_NAME.BLUE}
        uname="XY"
        text="想看其他用户的看法"
        angle={arrange ? 0 : -2}
      />
      <VoiceCard color={COLOR_NAME.ORANGE} uname="XY" text="好奇未来规划" angle={arrange ? 0 : 2} />
      <VoiceCard
        color={COLOR_NAME.PURPLE}
        uname="TY"
        text="遇到同样的问题"
        angle={arrange ? 0 : -2}
      />
      <VoiceCard
        color={COLOR_NAME.RED}
        uname="CT"
        text="新功能是否有排期？"
        angle={arrange ? 0 : 2}
      />
      <VoiceCard
        color={COLOR_NAME.BROWN}
        uname="XY"
        text="想知道 Bug 何时修复"
        angle={arrange ? 0 : -2}
      />
      <VoiceCard
        color={COLOR_NAME.GREEN}
        uname="XY"
        text="好奇官方有哪些新通告"
        angle={arrange ? 0 : 3}
      />
      <VoiceCard
        color={COLOR_NAME.PINK}
        uname="XY"
        text="需要之前发布的某个版本"
        angle={arrange ? 0 : -1}
      />
      <VoiceCard
        color={COLOR_NAME.PURPLE}
        uname="RU"
        text="有什么攻略彩蛋？"
        angle={arrange ? 0 : 2}
      />
      <VoiceCard
        color={COLOR_NAME.BLUE}
        uname="WT"
        text="想分享使用心得"
        angle={arrange ? 0 : -2}
      />
      <VoiceCard color={COLOR_NAME.CYAN} uname="QE" text="想找到组织" angle={arrange ? 0 : -3} />
    </Wrapper>
  )
}

export default UserVoice
