import useTwBelt from '~/hooks/useTwBelt'

import useBase from '..'

export { cn } from '~/css'

export default () => {
  const { cn } = useTwBelt()
  const base = useBase()

  return {
    wrapper: cn(base.main, 'align-both purple-selection'),
    active: base.mainActive,
    divider: 'ml-5 mr-8',
  }
}
