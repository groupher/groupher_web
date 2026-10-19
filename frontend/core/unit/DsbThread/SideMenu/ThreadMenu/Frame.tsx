import Collapsed from '../Collapsed'
import SubMenu from '../SubMenu'
import type { TThreadMenuFrameProps } from './spec'

export default function ThreadMenuFrame({
  activeSlug,
  collapsed,
  collapsedClassName,
  config,
  endSlots,
  onCollapse,
  onExpand,
  returnTo,
  view,
}: TThreadMenuFrameProps) {
  if (collapsed) {
    return (
      <Collapsed
        activeSlug={activeSlug}
        className={collapsedClassName}
        onExpand={onExpand}
        view={view}
        {...config}
      />
    )
  }

  return (
    <SubMenu
      activeSlug={activeSlug}
      endSlots={endSlots}
      onCollapse={onCollapse}
      returnTo={returnTo}
      {...config}
    />
  )
}
