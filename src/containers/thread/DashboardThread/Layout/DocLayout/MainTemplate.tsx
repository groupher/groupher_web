import type { FC } from 'react'

import type { TDocLayout } from '~/spec'
import { DOC_LAYOUT } from '~/const/layout'

import ToolSVG from '~/icons/Heart'

import { Br } from '~/widgets/Common'

import useSalon, {
  cn,
  Bar,
  Box3,
  BorderBox3,
  CardssLayoutWrapper,
  BlocksLayoutWrapper,
  FooterMore,
} from '../../styles/layout/doc_layout/main_template'

type TProps = {
  layout: TDocLayout
}

const MainTemplate: FC<TProps> = ({ layout }) => {
  const s = useSalon()

  if (layout === DOC_LAYOUT.CARDS) {
    return (
      <CardssLayoutWrapper>
        <BorderBox3>
          <Bar long={30} thin />
          <Br bottom={5} />
          <Bar long={80} thin bold />
          <Br bottom={10} />
          <Bar long={50} thin />
          <Br bottom={6} />
          <Bar long={40} thin />
          <Br bottom={20} />
          <FooterMore>
            <Bar long={30} thin />
          </FooterMore>
        </BorderBox3>
        <BorderBox3>
          <Bar long={30} thin />
          <Br bottom={5} />
          <Bar long={60} thin bold />
          <Br bottom={10} />
          <Bar long={50} thin />
          <Br bottom={6} />
          <Bar long={40} thin />
          <Br bottom={20} />
          <FooterMore>
            <Bar long={30} thin />
          </FooterMore>
        </BorderBox3>
        <BorderBox3>
          <Bar long={30} thin />
          <Br bottom={5} />
          <Bar long={60} thin bold />
          <Br bottom={10} />
          <Bar long={50} thin />
          <Br bottom={6} />
          <Bar long={40} thin />
          <Br bottom={20} />
          <FooterMore>
            <Bar long={30} thin />
          </FooterMore>
        </BorderBox3>
        <BorderBox3>
          <Bar long={60} thin bold />
          <Br bottom={10} />
          <Bar long={50} thin />
          <Br bottom={6} />
          <Bar long={40} thin />
        </BorderBox3>
        <BorderBox3>
          <Bar long={60} thin bold />
          <Br bottom={10} />
          <Bar long={50} thin />
          <Br bottom={6} />
          <Bar long={40} thin />
        </BorderBox3>
      </CardssLayoutWrapper>
    )
  }

  if (layout === DOC_LAYOUT.LISTS) {
    return (
      <div className={s.block}>
        <div className={cn(s.iconBox, s.redBg, 'top-2 left-12')}>
          <ToolSVG className={cn(s.icon, s.red)} />
        </div>
        <div className={cn(s.bar, 'h-1.5 top-3 left-20')} />
        <div className={cn(s.bar, 'w-28 h-1 top-6 left-20 opacity-20')} />
        <div className={cn(s.bar, 'w-16 mt-0.5 h-1 top-8 left-20 opacity-10')} />

        <div className={cn(s.iconBox, s.blueBg, 'top-12 left-12')}>
          <ToolSVG className={cn(s.icon, s.blue)} />
        </div>
        <div className={cn(s.bar, 'h-1.5 top-14 -mt-1 left-20 w-16')} />
        <div className={cn(s.bar, 'w-24 h-1 top-16 left-20 opacity-20')} />
        <div className={cn(s.bar, 'w-20 mt-0.5 h-1 top-20 -mt-1.5 left-20 opacity-10')} />

        <div className={cn(s.iconBox, s.purpleBg, 'bottom-16 left-12')}>
          <ToolSVG className={cn(s.icon, s.purple)} />
        </div>
        <div className={cn(s.bar, 'h-1.5 bottom-16 mb-3 left-20 w-20')} />
        <div className={cn(s.bar, 'w-24 h-1 bottom-16 mb-0.5 left-20 opacity-20')} />
        <div className={cn(s.bar, 'w-10 mt-0.5 h-1 bottom-14 mt-1 left-20 opacity-10')} />

        <div className={cn(s.iconBox, s.greenBg, 'bottom-6 left-12')}>
          <ToolSVG className={cn(s.icon, s.green)} />
        </div>
        <div className={cn(s.bar, 'h-1.5 bottom-6 mb-3 left-20 w-14')} />
        <div className={cn(s.bar, 'w-28 h-1 bottom-6 mb-0.5 left-20 opacity-20')} />
        <div className={cn(s.bar, 'w-10 mt-0.5 h-1 bottom-4 mt-1 left-20 opacity-10')} />
      </div>
    )
  }

  return (
    <BlocksLayoutWrapper>
      <Box3>
        <div className={cn(s.iconBox, s.blueBg)}>
          <ToolSVG className={cn(s.icon, s.blue)} />
        </div>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <div className={cn(s.iconBox, s.redBg)}>
          <ToolSVG className={cn(s.icon, s.red)} />
        </div>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <div className={cn(s.iconBox, s.purpleBg)}>
          <ToolSVG className={cn(s.icon, s.purple)} />
        </div>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <div className={cn(s.iconBox, s.greenBg)}>
          <ToolSVG className={cn(s.icon, s.green)} />
        </div>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
      <Box3>
        <div className={cn(s.iconBox, s.blueBg)}>
          <ToolSVG className={cn(s.icon, s.purple)} />
        </div>
        <Bar long={60} thin bold />
        <Br bottom={10} />
        <Bar long={50} thin />
        <Br bottom={6} />
        <Bar long={40} thin />
      </Box3>
    </BlocksLayoutWrapper>
  )
}

export default MainTemplate
