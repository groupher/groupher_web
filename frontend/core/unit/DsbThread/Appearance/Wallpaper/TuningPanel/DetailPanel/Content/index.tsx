import useTrans from '~/hooks/useTrans'
import ToggleField from '~/ui/TuningFields/ToggleField'

import useSalon from '../../salon/detail_panel/content'
import GroupTitle from '../GroupTitle'

type Props = {
  contentShadow: boolean
  onToggleShadow: (enabled: boolean) => void
}

export default function Content({ contentShadow, onToggleShadow }: Props) {
  const { t } = useTrans()
  const s = useSalon()

  return (
    <section className={s.wrapper}>
      <GroupTitle>{t('dsb.appearance.wallpaper.editor.content')}</GroupTitle>

      <div className={s.items}>
        <ToggleField
          label={t('dsb.appearance.wallpaper.editor.shadow')}
          checked={contentShadow}
          onChange={onToggleShadow}
        />
      </div>
    </section>
  )
}
