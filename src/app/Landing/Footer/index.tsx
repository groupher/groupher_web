import type { FC } from 'react'

import useWallpaper from '@/hooks/useWallpaper'
import { ROUTE } from '@/const/route'

import { LinkAble } from '@/widgets/Common'
import Button from '@/widgets/Buttons/Button'

import { Wrapper, Logo, Title, Desc, Highlight, Buttons, CreateButton } from '../styles/footer'

const Footer: FC = () => {
  const { wallpaper } = useWallpaper()

  return (
    <Wrapper>
      <Logo src="groupher-alpha.png" />

      <Title>节省团队宝贵时间</Title>
      <Desc>
        你只需专注于产品的<Highlight>核心功能</Highlight>，将周边的「<Highlight>杂活儿</Highlight>
        」交给 Groupher
      </Desc>
      <Buttons>
        <LinkAble href={ROUTE.APPLY_COMMUNITY}>
          <CreateButton size="medium" wallpaper={wallpaper}>
            创建我的社区
          </CreateButton>
        </LinkAble>

        <Button size="medium" ghost>
          预约演示
        </Button>
      </Buttons>
    </Wrapper>
  )
}

export default Footer
