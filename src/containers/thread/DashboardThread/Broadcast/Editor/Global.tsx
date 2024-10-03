import ColorSelector from '~/widgets/ColorSelector'
import ToggleSwitch from '~/widgets/Buttons/ToggleSwitch'
import Input from '~/widgets/Input'

import SectionLabel from '../../SectionLabel'
import GlobalTemplate from '../Templates/Global'
import SavingBar from '../../SavingBar'

import useBroadcast from '../../logic/useBroadcast'
import useSalon from '../../styles/broadcast/editor/global'

export default () => {
  const {
    saving,
    broadcastBg,
    broadcastEnable,
    broadcastOnSave,
    broadcastOnCancel,
    getIsTouched,
    edit,
    changeEnable,
  } = useBroadcast()
  const isTouched = getIsTouched()
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <SectionLabel
        title="开启横幅广播"
        desc={<div className={s.enableDesc}>开启后，本社区内的所有页面顶部将展示广播信息</div>}
        addon={<ToggleSwitch checked={broadcastEnable} onChange={(v) => changeEnable(v)} />}
        bottom={5}
      />

      <GlobalTemplate />
      <br />

      <div className={s.item}>
        <label className={s.label}>背景色</label>
        <div className={s.bgLabel}>
          <ColorSelector
            activeColor={broadcastBg}
            onChange={(color) => edit(color, 'broadcastBg')}
            placement="right"
            offset={[-1, 15]}
          >
            <div className={s.colorBall} />
          </ColorSelector>
        </div>
      </div>

      <div className={s.item}>
        <label className={s.label}>广播内容</label>
        <Input />
      </div>

      <div className={s.item}>
        <label className={s.label}>链接地址</label>
        <Input />
      </div>

      <SavingBar
        isTouched={isTouched}
        onCancel={broadcastOnCancel}
        onConfirm={broadcastOnSave}
        loading={saving}
        top={10}
      />
    </div>
  )
}
