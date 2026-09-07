import { cn } from '~/css'

import useSalon from './salon'

type TProps = {
  dark?: boolean
}

export default function PopoverContent({ dark = false }: TProps) {
  const s = useSalon()
  const tone = dark ? 'bg-white' : 'bg-black'

  return (
    <div className={s.popoverBody}>
      <div className={cn(s.bar, s.popoverTitle, tone)} />
      <div className={cn(s.bar, s.popoverBodyWide, tone)} />
      <div className={cn(s.bar, s.popoverBodyNarrow, tone)} />
    </div>
  )
}
