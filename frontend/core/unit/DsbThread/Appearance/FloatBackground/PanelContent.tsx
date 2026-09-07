import { cn } from '~/css'

import useSalon from './salon'

type TProps = {
  dark?: boolean
}

export default function PanelContent({ dark = false }: TProps) {
  const s = useSalon()
  const tone = dark ? 'bg-white' : s.barToneLight

  return (
    <>
      <div className={cn(s.bar, s.panelTitle, tone)} />
      <div className={cn(s.bar, s.panelShort, tone)} />
      <div className={cn(s.bar, s.panelWide, tone)} />
      <div className={cn(s.bar, s.panelMid, tone)} />
      <div className={cn(s.bar, s.panelNarrow, tone)} />
      <div className={cn(s.bar, s.panelWideDim, tone)} />
      <div className={cn(s.bar, s.panelWideDim, tone)} />
    </>
  )
}
