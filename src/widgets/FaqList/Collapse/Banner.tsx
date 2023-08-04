import { FC, memo, useCallback } from 'react'
import { pluck } from 'ramda'

import type { TMenuOption, TFAQSection } from '@/spec'

import MenuButton from '@/widgets/Buttons/MenuButton'

import { Wrapper, Title, MenuWrapper, MenuIcon } from '../styles/collapse/banner'

type TProps = {
  menuOptions: TMenuOption[]
  setOpenedIDs: (ids: number[]) => void
  sections: TFAQSection[]
}

const Banner: FC<TProps> = ({ menuOptions, setOpenedIDs, sections }) => {
  const foldAll = useCallback(() => setOpenedIDs([]), [])
  const unFoldAll = useCallback(
    () => setOpenedIDs(pluck('index', sections)),
    [sections, setOpenedIDs],
  )

  const handleMenu = useCallback(
    (key) => {
      switch (key) {
        case 'fold': {
          return foldAll()
        }
        case 'unfold': {
          return unFoldAll()
        }

        default: {
          console.log('todo')
        }
      }
    },
    [foldAll, unFoldAll],
  )

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
