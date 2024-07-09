/*
 *
 * IconSwitcher
 *
 */

import { type FC, memo } from 'react'
import { findIndex, propEq } from 'ramda'

import SVG from '~/const/svg'
import Tooltip from '~/widgets/Tooltip'

import { Wrapper, Tabs, DescText, Label, Slider, getLocalIcon } from './styles/icon_selector'

type TItem = {
  icon?: string
  key: string
  desc?: string
}

type TProps = {
  items: TItem[]
  activeKey: string
  onChange?: (item: TItem) => void
}

const IconSwitcher: FC<TProps> = ({ items, activeKey, onChange = console.log }) => {
  const slideIndex = findIndex(propEq(activeKey, 'key'), items)

  return (
    <Wrapper $testid="selectors">
      {/* <AccessZone /> */}
      <Tabs>
        {items.map((item) => {
          const LocalIcon = getLocalIcon(item.icon || SVG.UPVOTE)

          return (
            <Tooltip
              key={item.key}
              content={<DescText>{item.desc}</DescText>}
              placement="top"
              delay={500}
              forceZIndex
              noPadding
            >
              <Label onClick={() => onChange(item)}>
                <LocalIcon $active={activeKey === item.key} />
              </Label>
            </Tooltip>
          )
        })}
        {slideIndex !== -1 && <Slider index={slideIndex} />}
      </Tabs>
    </Wrapper>
  )
}

export default memo(IconSwitcher)
