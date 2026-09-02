import { filter } from 'ramda'
import { useMemo } from 'react'

import useDsb from '~/query/useDsbConfig'
import type { TNameAlias } from '~/spec'

const useNameAlias = (group = 'kanban'): Record<string, TNameAlias> => {
  const { nameAlias } = useDsb()

  const alias = {}
  let aliasList = []

  const curAlias = useMemo(() => nameAlias, [nameAlias])

  if (!group) {
    aliasList = [...curAlias]
  } else {
    aliasList = filter((item: TNameAlias) => item.group === group, [...curAlias])
  }

  for (const item of aliasList) {
    alias[item.slug] = item
  }

  return alias
}

export default useNameAlias
