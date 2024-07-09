import { type FC, memo, useCallback } from 'react'
import { pluck } from 'ramda'

import type { TMenuOption, TFAQSection } from '~/spec'

import MenuButton from '~/widgets/Buttons/MenuButton'

import { Wrapper, Title, MenuWrapper, MenuIcon } from '../styles/collapse/banner'

type TProps = {
  menuOptions: TMenuOption[]
  setOpenedIndexes: (ids: number[]) => void
  sections: TFAQSection[]
}

const Banner: FC<TProps> = ({ menuOptions, setOpenedIndexes, sections }) => {
  const foldAll = () => setOpenedIndexes([])
  const unFoldAll = useCallback(
    () => setOpenedIndexes(pluck('index', sections)),
    [sections, setOpenedIndexes],
  )

  const handleMenu = (key) => {
    switch (key) {
      case 'fold': {
        foldAll()
        return
      }
      case 'unfold': {
        unFoldAll()
        return
      }

      default: {
        console.log('## todo')
        return
      }
    }
  }

  return (
    <Wrapper>
      <Title>常见问题</Title>
      <MenuWrapper>
        <MenuButton placement="bottom-end" options={menuOptions} onClick={(key) => handleMenu(key)}>
          <MenuIcon />
        </MenuButton>
      </MenuWrapper>
    </Wrapper>
  )
}

export default memo(Banner)
