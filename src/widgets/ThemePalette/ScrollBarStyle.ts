import { createGlobalStyle } from 'styled-components'

import { theme } from '~/css'
/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.13.0
 *
 * Copyright KingSora | Rene Haas.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 02.08.2020
 */

/*
OVERLAY SCROLLBARS CORE:
*/

const ScrollBarStyle = createGlobalStyle`
/*!
 * OverlayScrollbars
 * Version: 2.4.5
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
.os-size-observer,
.os-size-observer-listener {
  scroll-behavior: auto !important;
  direction: inherit;
  pointer-events: none;
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
}

.os-size-observer,
.os-size-observer-listener,
.os-size-observer-listener-item,
.os-size-observer-listener-item-final {
  writing-mode: horizontal-tb;
  position: absolute;
  left: 0;
  top: 0;
}

.os-size-observer {
  z-index: -1;
  contain: strict;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: inherit;
  border: inherit;
  box-sizing: inherit;
  margin: -133px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: scale(0.1);
}
.os-size-observer::before {
  content: "";
  flex: none;
  box-sizing: inherit;
  padding: 10px;
  width: 10px;
  height: 10px;
}

.os-size-observer-appear {
  animation: os-size-observer-appear-animation 1ms forwards;
}

.os-size-observer-listener {
  box-sizing: border-box;
  position: relative;
  flex: auto;
  padding: inherit;
  border: inherit;
  margin: -133px;
  transform: scale(10);
}
.os-size-observer-listener.ltr {
  margin-right: -266px;
  margin-left: 0;
}
.os-size-observer-listener.rtl {
  margin-left: -266px;
  margin-right: 0;
}
.os-size-observer-listener:empty::before {
  content: "";
  width: 100%;
  height: 100%;
}
.os-size-observer-listener:empty::before, .os-size-observer-listener > .os-size-observer-listener-item {
  display: block;
  position: relative;
  padding: inherit;
  border: inherit;
  box-sizing: content-box;
  flex: auto;
}

.os-size-observer-listener-scroll {
  box-sizing: border-box;
  display: flex;
}

.os-size-observer-listener-item {
  right: 0;
  bottom: 0;
  overflow: hidden;
  direction: ltr;
  flex: none;
}

.os-size-observer-listener-item-final {
  transition: none;
}

@keyframes os-size-observer-appear-animation {
  from {
    cursor: auto;
  }
  to {
    cursor: none;
  }
}
.os-trinsic-observer {
  flex: none;
  box-sizing: border-box;
  position: relative;
  max-width: 0px;
  max-height: 1px;
  padding: 0;
  margin: 0;
  border: none;
  overflow: hidden;
  z-index: -1;
  height: 0;
  top: calc(100% + 1px);
  contain: strict;
}
.os-trinsic-observer:not(:empty) {
  height: calc(100% + 1px);
  top: -1px;
}
.os-trinsic-observer:not(:empty) > .os-size-observer {
  width: 1000%;
  height: 1000%;
  min-height: 1px;
  min-width: 1px;
}

/**
 * environment setup
 */
.os-environment {
  scroll-behavior: auto !important;
  --os-custom-prop: -1;
  position: fixed;
  opacity: 0;
  visibility: hidden;
  overflow: scroll;
  height: 200px;
  width: 200px;
  z-index: var(--os-custom-prop);
}
.os-environment div {
  width: 200%;
  height: 200%;
  margin: 10px 0;
}
.os-environment.os-environment-flexbox-glue {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: auto;
  width: auto;
  min-height: 200px;
  min-width: 200px;
}
.os-environment.os-environment-flexbox-glue div {
  flex: auto;
  width: auto;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  margin: 0;
}
.os-environment.os-environment-flexbox-glue-max {
  max-height: 200px;
}
.os-environment.os-environment-flexbox-glue-max div {
  overflow: visible;
}
.os-environment.os-environment-flexbox-glue-max div::before {
  content: "";
  display: block;
  height: 999px;
  width: 999px;
}

/**
 * hide native scrollbars
 */
.os-environment,
[data-overlayscrollbars-viewport] {
  -ms-overflow-style: scrollbar !important;
}

[data-overlayscrollbars-initialize],
[data-overlayscrollbars~=scrollbarHidden],
[data-overlayscrollbars-viewport~=scrollbarHidden],
.os-scrollbar-hidden.os-environment {
  scrollbar-width: none !important;
}

[data-overlayscrollbars-initialize]::-webkit-scrollbar,
[data-overlayscrollbars-initialize]::-webkit-scrollbar-corner,
[data-overlayscrollbars~=scrollbarHidden]::-webkit-scrollbar,
[data-overlayscrollbars~=scrollbarHidden]::-webkit-scrollbar-corner,
[data-overlayscrollbars-viewport~=scrollbarHidden]::-webkit-scrollbar,
[data-overlayscrollbars-viewport~=scrollbarHidden]::-webkit-scrollbar-corner,
.os-scrollbar-hidden.os-environment::-webkit-scrollbar,
.os-scrollbar-hidden.os-environment::-webkit-scrollbar-corner {
  -webkit-appearance: none !important;
          appearance: none !important;
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/**
 * elements wont suddenly crop after initialization is done
 */
[data-overlayscrollbars-initialize]:not([data-overlayscrollbars]):not(html):not(body) {
  overflow: auto;
}

/**
 * applied to body
 */
html[data-overlayscrollbars],
html.os-scrollbar-hidden,
html.os-scrollbar-hidden > body {
  box-sizing: border-box;
  margin: 0;
  width: 100%;
  height: 100%;
}

html[data-overlayscrollbars] > body {
  overflow: visible;
}

/**
 * structure setup
 */
[data-overlayscrollbars~=host],
[data-overlayscrollbars-padding] {
  display: flex;
  align-items: stretch !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
}

[data-overlayscrollbars-padding],
[data-overlayscrollbars-viewport] {
  box-sizing: inherit;
  position: relative;
  flex: auto !important;
  height: auto;
  width: 100%;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: none;
  z-index: 0;
}

[data-overlayscrollbars-viewport] {
  --os-vaw: 0;
  --os-vah: 0;
}
[data-overlayscrollbars-viewport][data-overlayscrollbars-viewport~=arrange]::before {
  content: "";
  position: absolute;
  pointer-events: none;
  z-index: -1;
  min-width: 1px;
  min-height: 1px;
  width: var(--os-vaw);
  height: var(--os-vah);
}

[data-overlayscrollbars-padding],
[data-overlayscrollbars-viewport] {
  overflow: hidden;
}

[data-overlayscrollbars~=host],
[data-overlayscrollbars~=viewport] {
  position: relative;
  overflow: hidden;
}

[data-overlayscrollbars~=overflowVisible],
[data-overlayscrollbars-padding~=overflowVisible],
[data-overlayscrollbars-viewport~=overflowVisible] {
  overflow: visible;
}

[data-overlayscrollbars-overflow-x=hidden] {
  overflow-x: hidden;
}

[data-overlayscrollbars-overflow-x=scroll] {
  overflow-x: scroll;
}

[data-overlayscrollbars-overflow-x=hidden] {
  overflow-y: hidden;
}

[data-overlayscrollbars-overflow-y=scroll] {
  overflow-y: scroll;
}

[data-overlayscrollbars~=scrollbarPressed],
[data-overlayscrollbars~=scrollbarPressed] [data-overlayscrollbars-viewport] {
  scroll-behavior: auto !important;
}

[data-overlayscrollbars-content] {
  box-sizing: inherit;
}

/**
 * Display contents to bridge any flickering during deferred initialization.
 */
[data-overlayscrollbars-contents]:not([data-overlayscrollbars-padding]):not([data-overlayscrollbars-viewport]):not([data-overlayscrollbars-content]) {
  display: contents;
}

/**
 * optional & experimental grid mode
 */
[data-overlayscrollbars-grid],
[data-overlayscrollbars-grid] [data-overlayscrollbars-padding] {
  display: grid;
  grid-template: 1fr/1fr;
}

[data-overlayscrollbars-grid] > [data-overlayscrollbars-padding],
[data-overlayscrollbars-grid] > [data-overlayscrollbars-viewport],
[data-overlayscrollbars-grid] > [data-overlayscrollbars-padding] > [data-overlayscrollbars-viewport] {
  height: auto !important;
  width: auto !important;
}

.os-scrollbar {
  contain: size layout;
  contain: size layout style;
  transition: opacity 0.15s, visibility 0.15s, top 0.15s, right 0.15s, bottom 0.15s, left 0.15s;
  pointer-events: none;
  position: absolute;
  opacity: 0;
  visibility: hidden;
}

body > .os-scrollbar {
  position: fixed;
  z-index: 99999;
}

.os-scrollbar-transitionless {
  transition: none;
}

.os-scrollbar-track {
  position: relative;
  direction: ltr !important;
  padding: 0 !important;
  border: none !important;
}

.os-scrollbar-handle {
  position: absolute;
}

.os-scrollbar-track,
.os-scrollbar-handle {
  pointer-events: none;
  width: 100%;
  height: 100%;
}

.os-scrollbar.os-scrollbar-track-interactive .os-scrollbar-track,
.os-scrollbar.os-scrollbar-handle-interactive .os-scrollbar-handle {
  pointer-events: auto;
  touch-action: none;
}

.os-scrollbar-horizontal {
  bottom: 0;
  left: 0;
}

.os-scrollbar-vertical {
  top: 0;
  right: 0;
}

.os-scrollbar-rtl.os-scrollbar-horizontal {
  right: 0;
}

.os-scrollbar-rtl.os-scrollbar-vertical {
  right: auto;
  left: 0;
}

.os-scrollbar-visible,
.os-scrollbar-interaction.os-scrollbar-visible {
  opacity: 1;
  visibility: visible;
}

.os-scrollbar-auto-hide.os-scrollbar-auto-hide-hidden {
  opacity: 0;
  visibility: hidden;
}

.os-scrollbar-unusable,
.os-scrollbar-unusable *,
.os-scrollbar-wheel,
.os-scrollbar-wheel * {
  pointer-events: none !important;
}

.os-scrollbar-unusable .os-scrollbar-handle {
  opacity: 0 !important;
}

.os-scrollbar-horizontal .os-scrollbar-handle {
  bottom: 0;
}

.os-scrollbar-vertical .os-scrollbar-handle {
  right: 0;
}

.os-scrollbar-rtl.os-scrollbar-vertical .os-scrollbar-handle {
  right: auto;
  left: 0;
}

.os-scrollbar.os-scrollbar-horizontal.os-scrollbar-cornerless,
.os-scrollbar.os-scrollbar-horizontal.os-scrollbar-cornerless.os-scrollbar-rtl {
  left: 0;
  right: 0;
}

.os-scrollbar.os-scrollbar-vertical.os-scrollbar-cornerless,
.os-scrollbar.os-scrollbar-vertical.os-scrollbar-cornerless.os-scrollbar-rtl {
  top: 0;
  bottom: 0;
}

.os-scrollbar {
  --os-size: 0;
  --os-padding-perpendicular: 0;
  --os-padding-axis: 0;
  --os-track-border-radius: 0;
  --os-track-bg: none;
  --os-track-bg-hover: none;
  --os-track-bg-active: none;
  --os-track-border: none;
  --os-track-border-hover: none;
  --os-track-border-active: none;
  --os-handle-border-radius: 0;
  --os-handle-bg: none;
  --os-handle-bg-hover: none;
  --os-handle-bg-active: none;
  --os-handle-border: none;
  --os-handle-border-hover: none;
  --os-handle-border-active: none;
  --os-handle-min-size: 33px;
  --os-handle-max-size: none;
  --os-handle-perpendicular-size: 100%;
  --os-handle-perpendicular-size-hover: 100%;
  --os-handle-perpendicular-size-active: 100%;
  --os-handle-interactive-area-offset: 0;
}

.os-scrollbar .os-scrollbar-track {
  border: var(--os-track-border);
  border-radius: var(--os-track-border-radius);
  background: transparent;
  transition: opacity 0.15s, background-color 0.15s, border-color 0.15s;
}
.os-scrollbar .os-scrollbar-track:hover {
  border: var(--os-track-border-hover);
  background: var(--os-track-bg-hover);
}
.os-scrollbar .os-scrollbar-track:active {
  border: var(--os-track-border-active);
  background: var(--os-track-bg-active);
}
.os-scrollbar .os-scrollbar-handle {
  border: var(--os-handle-border);
  border-radius: var(--os-handle-border-radius);
  background: ${theme('hint')};
}
.os-scrollbar .os-scrollbar-handle:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: block;
}
.os-scrollbar .os-scrollbar-handle:hover {
  border: var(--os-handle-border-hover);
  background: var(--os-handle-bg-hover);
}
.os-scrollbar .os-scrollbar-handle:active {
  border: var(--os-handle-border-active);
  background: var(--os-handle-bg-active);
}

.os-scrollbar-horizontal {
  padding: var(--os-padding-perpendicular) var(--os-padding-axis);
  right: var(--os-size);
  height: var(--os-size);
}
.os-scrollbar-horizontal.os-scrollbar-rtl {
  left: var(--os-size);
  right: 0;
}
.os-scrollbar-horizontal .os-scrollbar-handle {
  min-width: var(--os-handle-min-size);
  max-width: var(--os-handle-max-size);
  height: var(--os-handle-perpendicular-size);
  transition: opacity 0.15s, background-color 0.15s, border-color 0.15s, height 0.15s;
}
.os-scrollbar-horizontal .os-scrollbar-handle:before {
  top: calc((var(--os-padding-perpendicular) + var(--os-handle-interactive-area-offset)) * -1);
  bottom: calc(var(--os-padding-perpendicular) * -1);
}
.os-scrollbar-horizontal:hover .os-scrollbar-handle {
  height: var(--os-handle-perpendicular-size-hover);
}
.os-scrollbar-horizontal:active .os-scrollbar-handle {
  height: var(--os-handle-perpendicular-size-active);
}

.os-scrollbar-vertical {
  padding: var(--os-padding-axis) var(--os-padding-perpendicular);
  bottom: var(--os-size);
  width: var(--os-size);
}
.os-scrollbar-vertical .os-scrollbar-handle {
  min-height: var(--os-handle-min-size);
  max-height: var(--os-handle-max-size);
  width: var(--os-handle-perpendicular-size);
  transition: opacity 0.15s, background-color 0.15s, border-color 0.15s, width 0.15s;
}
.os-scrollbar-vertical .os-scrollbar-handle:before {
  left: calc((var(--os-padding-perpendicular) + var(--os-handle-interactive-area-offset)) * -1);
  right: calc(var(--os-padding-perpendicular) * -1);
}
.os-scrollbar-vertical.os-scrollbar-rtl .os-scrollbar-handle:before {
  right: calc((var(--os-padding-perpendicular) + var(--os-handle-interactive-area-offset)) * -1);
  left: calc(var(--os-padding-perpendicular) * -1);
}
.os-scrollbar-vertical:hover .os-scrollbar-handle {
  width: var(--os-handle-perpendicular-size-hover);
}
.os-scrollbar-vertical:active .os-scrollbar-handle {
  width: var(--os-handle-perpendicular-size-active);
}

/* NONE THEME: */
[data-overlayscrollbars~=updating] > .os-scrollbar,
.os-theme-none.os-scrollbar {
  display: none !important;
}

/* DARK & LIGHT THEME: */
.os-theme-dark,
.os-theme-light {
  box-sizing: border-box;
  --os-size: 10px;
  --os-padding-perpendicular: 2px;
  --os-padding-axis: 2px;
  --os-track-border-radius: 10px;
  --os-handle-interactive-area-offset: 4px;
  --os-handle-border-radius: 10px;
}

.os-theme-dark {
  --os-handle-bg: rgba(0, 0, 0, 0.44);
  --os-handle-bg-hover: rgba(0, 0, 0, 0.55);
  --os-handle-bg-active: rgba(0, 0, 0, 0.66);
}

.os-theme-light {
  --os-handle-bg: rgba(255, 255, 255, 0.44);
  --os-handle-bg-hover: rgba(255, 255, 255, 0.55);
  --os-handle-bg-active: rgba(255, 255, 255, 0.66);
}

.os-no-css-vars.os-theme-dark.os-scrollbar .os-scrollbar-handle, .os-no-css-vars.os-theme-light.os-scrollbar .os-scrollbar-handle {
  border-radius: 10px;
}
.os-no-css-vars.os-theme-dark.os-scrollbar .os-scrollbar-track, .os-no-css-vars.os-theme-light.os-scrollbar .os-scrollbar-track {
  border-radius: 10px;
}
.os-no-css-vars.os-theme-dark.os-scrollbar .os-scrollbar-handle, .os-no-css-vars.os-theme-light.os-scrollbar .os-scrollbar-handle {
  border-radius: 10px;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal {
  padding: 2px 2px;
  right: 10px;
  height: 10px;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal.os-scrollbar-cornerless, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal.os-scrollbar-cornerless {
  right: 0;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal.os-scrollbar-rtl, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal.os-scrollbar-rtl {
  left: 10px;
  right: 0;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal.os-scrollbar-rtl.os-scrollbar-cornerless, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal.os-scrollbar-rtl.os-scrollbar-cornerless {
  left: 0;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal .os-scrollbar-handle, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal .os-scrollbar-handle {
  min-width: 33px;
  max-width: none;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-horizontal .os-scrollbar-handle:before, .os-no-css-vars.os-theme-light.os-scrollbar-horizontal .os-scrollbar-handle:before {
  top: calc((
                2px + 4px
              ) * -1);
  bottom: calc(2px * -1);
}
.os-no-css-vars.os-theme-dark.os-scrollbar-vertical, .os-no-css-vars.os-theme-light.os-scrollbar-vertical {
  padding: 2px 2px;
  bottom: 10px;
  width: 10px;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-vertical.os-scrollbar-cornerless, .os-no-css-vars.os-theme-light.os-scrollbar-vertical.os-scrollbar-cornerless {
  bottom: 0;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-vertical .os-scrollbar-handle, .os-no-css-vars.os-theme-light.os-scrollbar-vertical .os-scrollbar-handle {
  min-height: 33px;
  max-height: none;
}
.os-no-css-vars.os-theme-dark.os-scrollbar-vertical .os-scrollbar-handle:before, .os-no-css-vars.os-theme-light.os-scrollbar-vertical .os-scrollbar-handle:before {
  left: calc((
                2px + 4px
              ) * -1);
  right: calc(2px * -1);
}
.os-no-css-vars.os-theme-dark.os-scrollbar-vertical.os-scrollbar-rtl .os-scrollbar-handle:before, .os-no-css-vars.os-theme-light.os-scrollbar-vertical.os-scrollbar-rtl .os-scrollbar-handle:before {
  right: calc((
              2px + 4px
            ) * -1);
  left: calc(2px * -1);
}
.os-no-css-vars.os-theme-dark .os-scrollbar-handle {
  background: rgba(0, 0, 0, 0.44);
}
.os-no-css-vars.os-theme-dark:hover .os-scrollbar-handle {
  background: rgba(0, 0, 0, 0.55);
}
.os-no-css-vars.os-theme-dark:active .os-scrollbar-handle {
  background: rgba(0, 0, 0, 0.66);
}
.os-no-css-vars.os-theme-light .os-scrollbar-handle {
  background: rgba(255, 255, 255, 0.44);
}
.os-no-css-vars.os-theme-light:hover .os-scrollbar-handle {
  background: rgba(255, 255, 255, 0.55);
}
.os-no-css-vars.os-theme-light:active .os-scrollbar-handle {
  background: rgba(255, 255, 255, 0.66);
}
`
export default ScrollBarStyle
