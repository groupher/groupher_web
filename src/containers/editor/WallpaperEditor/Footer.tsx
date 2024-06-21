import { WALLPAPER_TYPE } from '@/const/wallpaper'

import { SpaceGrow } from '@/widgets/Common'
import YesOrNoButtons from '@/widgets/Buttons/YesOrNoButtons'
import Button from '@/widgets/Buttons/Button'

import useLogic from './useLogic'
import { Wrapper, InnrWrapper, ForbidImgIcon } from './styles/footer'

export default () => {
  const { getWallpaper, loading, getIsTouched, removeWallpaper, close, onSave, resetWallpaper } =
    useLogic()
  const { wallpaperType } = getWallpaper()
  const isTouched = getIsTouched()

  return (
    <Wrapper>
      <InnrWrapper>
        {wallpaperType !== WALLPAPER_TYPE.NONE ? (
          <Button size="small" ghost onClick={() => removeWallpaper()}>
            <ForbidImgIcon /> 空白壁纸
          </Button>
        ) : (
          <div />
        )}
        <SpaceGrow />

        {isTouched ? (
          <YesOrNoButtons
            cancelText="放弃变更"
            confirmText="确定"
            space={4}
            onCancel={() => {
              resetWallpaper()
              close()
            }}
            onConfirm={() => onSave()}
          />
        ) : (
          <Button size="small" space={10} loading={loading} onClick={() => onSave()}>
            确定
          </Button>
        )}
      </InnrWrapper>
    </Wrapper>
  )
}
