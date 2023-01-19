/* *
 * WallpaperEditor
 *
 */

import { FC, Fragment } from 'react'

import { WALLPAPER_CUSTOM, WALLPAPER_TYPE } from '@/constant/wallpaper'

import { Br } from '@/widgets/Common'
import ToggleSwitch from '@/widgets/Buttons/ToggleSwitch'

import PictureGroup from './PictureGroup'
import GradientGroup from './GradientGroup'
import CustomGradientEditor from './CustomGradientEditor'
import AnglePanel from './AnglePanel'

import type { TWallpaperData } from '../spec'
import {
  Wrapper,
  Title,
  SettingWrapper,
  SwitchWrapper,
  ToggleTitle,
  GeneralSettings,
  Divider,
  MainDivider,
  AngleSettings,
} from '../styles/build_in'
import { togglePattern, toggleBlur, toggleShadow } from '../logic'

type TProps = {
  wallpaperData: TWallpaperData
}

const BuildIn: FC<TProps> = ({ wallpaperData }) => {
  const {
    wallpaper,
    wallpaperType,
    gradientWallpapers,
    patternWallpapers,
    hasPattern,
    hasBlur,
    hasShadow,
    direction,
    customColor,
  } = wallpaperData

  return (
    <Wrapper>
      <Title>渐变:</Title>
      <GradientGroup wallpaper={wallpaper} gradientWallpapers={gradientWallpapers} />
      {wallpaper === WALLPAPER_CUSTOM && <CustomGradientEditor customColor={customColor} />}
      <Br top={25} />
      <Title>图片:</Title>
      <PictureGroup wallpaper={wallpaper} patternWallpapers={patternWallpapers} />
      <MainDivider />
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
              <AnglePanel direction={direction} />
            </AngleSettings>
          </Fragment>
        )}
      </SettingWrapper>
      <Br top={50} />
    </Wrapper>
  )
}

export default BuildIn
