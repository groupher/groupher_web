/* *
 * WallpaperEditor
 *
 */

import { Fragment } from 'react'

import { WALLPAPER_TYPE } from '@/const/wallpaper'

import { Br, SexyDivider } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import PictureGroup from './PictureGroup'
import GradientGroup from './GradientGroup'
import CustomGradientEditor from './CustomGradientEditor'
import AnglePanel from './AnglePanel'

import useLogic from '../useLogic'
import {
  Wrapper,
  Title,
  SettingWrapper,
  SwitchWrapper,
  ToggleTitle,
  GeneralSettings,
  Divider,
  AngleSettings,
} from '../styles/build_in'

export default () => {
  const { getWallpaper, togglePattern, toggleBlur, toggleShadow } = useLogic()
  const { wallpaperType, hasPattern, hasBlur, hasShadow } = getWallpaper()

  return (
    <Wrapper>
      <Title>渐变:</Title>
      <GradientGroup />
      {wallpaperType === WALLPAPER_TYPE.CUSTOM_GRADIENT && <CustomGradientEditor />}
      <Br top={25} />
      <Title>图片:</Title>
      <PictureGroup />
      <SexyDivider top={50} bottom={50} />
      <SettingWrapper show={wallpaperType !== WALLPAPER_TYPE.NONE}>
        <GeneralSettings>
          <Title>附加效果:</Title>
          {wallpaperType === WALLPAPER_TYPE.GRADIENT && (
            <SwitchWrapper>
              <ToggleTitle>叠加花纹</ToggleTitle>
              <ToggleSwitch checked={hasPattern} onChange={togglePattern} />
            </SwitchWrapper>
          )}
          <Br top={6} />
          <SwitchWrapper>
            <ToggleTitle>模糊效果</ToggleTitle>
            <ToggleSwitch checked={hasBlur} onChange={toggleBlur} />
          </SwitchWrapper>

          <Br top={6} />
          <SwitchWrapper>
            <ToggleTitle>阴影效果</ToggleTitle>
            <ToggleSwitch checked={hasShadow} onChange={toggleShadow} />
          </SwitchWrapper>
        </GeneralSettings>

        {wallpaperType === WALLPAPER_TYPE.GRADIENT && (
          <Fragment>
            <Divider />
            <AngleSettings>
              <Title>渐变方向:</Title>
              <AnglePanel />
            </AngleSettings>
          </Fragment>
        )}
      </SettingWrapper>
      <Br top={80} />
    </Wrapper>
  )
}
