import { WithPosition } from '~/widgets/Common'

import styled, { css, theme } from '~/css'

export const Wrapper = styled(WithPosition)`
  width: 180px;
  height: 150px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  background: ${theme('htmlBg')};

  background-size: cover;
  background-position: center center;
  background-repeat: repeat;
  /* background-image: url("data:image/svg+xml;utf8,%3Csvg height=%22auto%22 viewBox=%220 0 2000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d=%22M0 982.022c30.8-9.292 92.4-34.42 154-46.46 61.6-12.04 92.4 9.655 154-13.738 61.6-23.394 92.4-69.905 154-103.232 61.6-33.326 92.4-46.487 154-63.4 61.6-16.912 92.4 13.59 154-21.162 61.6-34.752 92.4-137.413 154-152.598 61.6-15.186 92.4 108.537 154 76.67 61.6-31.866 92.4-176.662 154-236.001 61.6-59.34 92.4-92.359 154-60.697 61.6 31.662 92.4 178.069 154 219.005 61.6 40.937 92.4 62.086 154-14.322 61.6-76.408 92.4-266.757 154-367.72 61.6-100.963 123.2-109.675 154-137.094L2000 1000H0Z%22 fill=%22%231996ff1a%22%2F%3E%3Cpath d=%22M0 982.022c30.8-9.292 92.4-34.42 154-46.46 61.6-12.04 92.4 9.655 154-13.738 61.6-23.394 92.4-69.905 154-103.232 61.6-33.326 92.4-46.487 154-63.4 61.6-16.912 92.4 13.59 154-21.162 61.6-34.752 92.4-137.413 154-152.598 61.6-15.186 92.4 108.537 154 76.67 61.6-31.866 92.4-176.662 154-236.001 61.6-59.34 92.4-92.359 154-60.697 61.6 31.662 92.4 178.069 154 219.005 61.6 40.937 92.4 62.086 154-14.322 61.6-76.408 92.4-266.757 154-367.72 61.6-100.963 123.2-109.675 154-137.094%22 fill=%22none%22 stroke=%22%231996ff%22 stroke-width=%227%22%2F%3E%3C%2Fsvg%3E"); */
  background-image: url("data:image/svg+xml;utf8,%3Csvg height=%22auto%22 viewBox=%220 0 2000 1000%22 xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath d=%22M0 982.022c30.8-9.292 92.4-34.42 154-46.46 61.6-12.04 92.4 9.655 154-13.738 61.6-23.394 92.4-69.905 154-103.232 61.6-33.326 92.4-46.487 154-63.4 61.6-16.912 92.4 13.59 154-21.162 61.6-34.752 92.4-137.413 154-152.598 61.6-15.186 92.4 108.537 154 76.67 61.6-31.866 92.4-176.662 154-236.001 61.6-59.34 92.4-92.359 154-60.697 61.6 31.662 92.4 178.069 154 219.005 61.6 40.937 92.4 62.086 154-14.322 61.6-76.408 92.4-266.757 154-367.72 61.6-100.963 123.2-109.675 154-137.094L2000 1000H0Z%22 fill=%22%23ff93191a%22%2F%3E%3Cpath d=%22M0 982.022c30.8-9.292 92.4-34.42 154-46.46 61.6-12.04 92.4 9.655 154-13.738 61.6-23.394 92.4-69.905 154-103.232 61.6-33.326 92.4-46.487 154-63.4 61.6-16.912 92.4 13.59 154-21.162 61.6-34.752 92.4-137.413 154-152.598 61.6-15.186 92.4 108.537 154 76.67 61.6-31.866 92.4-176.662 154-236.001 61.6-59.34 92.4-92.359 154-60.697 61.6 31.662 92.4 178.069 154 219.005 61.6 40.937 92.4 62.086 154-14.322 61.6-76.408 92.4-266.757 154-367.72 61.6-100.963 123.2-109.675 154-137.094%22 fill=%22none%22 stroke=%22%23ff9319%22 stroke-width=%227%22%2F%3E%3C%2Fsvg%3E");
`

type TLine = { height?: string; width?: string }
export const Column = styled(WithPosition)<TLine>`
  height: ${({ height }) => height || '100px'};
  width: 1px;
  background: ${theme('hint')};
  opacity: 0.2;
  z-index: 2;
  transition: all 0.2s;
`
export const HighlightColumn = styled(Column)<TLine>`
  height: ${({ height }) => height || '100px'};
  width: 2px;
  opacity: 1;
  background: transparent;

  border-right: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('rainbow.orange')},
    ${theme('rainbow.orange')},
    ${theme('rainbow.orange')},
    transparent
  );

  border-image-slice: 1;
`
export const HighlightDot = styled(WithPosition)`
  ${css.circle(12)};
  background: ${theme('rainbow.orange')};
  border: 2px solid;
  border-color: ${theme('htmlBg')};
  transition: all .2s;
  z-index: 10;
`

export const ChartBottomGradient = styled(WithPosition)`
  width: 100%;
  height: 45px;
  background: white;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: linear-gradient(353deg, rgb(255 255 255) 25%, rgb(0 0 0 / 0%) 80%);
  border-radius: 10px;
`

export const TrendText = styled(WithPosition)`
  color: ${theme('hint')};
  font-size: 10px;
`
export const TrendNum = styled(WithPosition)`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
`
