import useDsb from '~/query/useDsbConfig'
import type { TEnableConf } from '~/spec'

/** Exposes enable state and actions through the shared React hook boundary. */
export default function useEnable(): TEnableConf {
  const dsb$ = useDsb()

  return dsb$.enable
}
