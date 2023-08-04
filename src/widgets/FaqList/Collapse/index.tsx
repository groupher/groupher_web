import { FC, memo, useState, useCallback, useEffect } from 'react'
import { isEmpty, includes, reject, pluck } from 'ramda'

import type { TID, TMenuOption } from '@/spec'

import { MENU, DEFAULT_MENU } from './constant'

import Banner from './Banner'
import Section from './Section'
import Footer from './Footer'

import { Wrapper } from '../styles/collapse'

import type { TProps as TIndex } from '../index'

type TProps = Pick<TIndex, 'sections'>

const Collapse: FC<TProps> = ({ sections }) => {
  const [openedIDs, setOpenedIDs] = useState<number[]>([])
  const [menuOptions, setMenuOptions] = useState<TMenuOption[]>(DEFAULT_MENU)

  useEffect(() => {
    const articleIds = pluck('index', sections)
    if (isEmpty(openedIDs)) {
      setMenuOptions([MENU.UNFOLD_ALL, MENU.AUTH_EDIT])
    } else if (openedIDs.length === articleIds.length) {
      setMenuOptions([MENU.FOLD_ALL, MENU.AUTH_EDIT])
    } else {
      setMenuOptions(DEFAULT_MENU)
    }
  }, [openedIDs, sections])

  // fold/unfold one item
  const toggle = useCallback(
    (id) => {
      includes(id, openedIDs)
        ? setOpenedIDs(reject((_id) => _id === id, openedIDs))
        : setOpenedIDs([id, ...openedIDs])
    },
    [openedIDs],
  )

  return (
    <Wrapper>
      <Banner menuOptions={menuOptions} setOpenedIDs={setOpenedIDs} sections={sections} />

      {sections.map((item) => (
        <Section key={item.index} item={item} openedIDs={openedIDs} toggle={toggle} />
      ))}

      <Footer />
    </Wrapper>
  )
}

export default memo(Collapse)
