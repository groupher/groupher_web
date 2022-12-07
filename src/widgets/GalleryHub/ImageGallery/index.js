/*
 *
 * ImageGallery
 *
 */

import React, { useState } from 'react'
import T from 'prop-types'

import { GALLERY } from '@/constant'
import { buildLog } from '@/utils/logger'

import Pagi from '@/widgets/Pagi'
import PagiOptionSwitcher from '@/widgets/Switcher/PagiOptionSwitcher'

import MainColumnGallery from './MainColumnGallery'
import TwoColumnGallery from './TwoColumnGallery'
import ThreeColumnGallery from './ThreeColumnGallery'
import MasonryGallery from './MasonryGallery'

import { Wrapper } from '../styles/image_gallery'

/* eslint-disable-next-line */
const log = buildLog('w:ImageGallery:index')

const GALLERY_TYPES = [
  {
    localIcon: GALLERY.MAIN_COLUMN,
    key: GALLERY.MAIN_COLUMN,
  },
  {
    localIcon: GALLERY.MASONRY_COLUMN,
    key: GALLERY.MASONRY_COLUMN,
  },
  {
    localIcon: GALLERY.TWO_COLUMN,
    key: GALLERY.TWO_COLUMN,
  },
  {
    localIcon: GALLERY.THREE_COLUMN,
    key: GALLERY.THREE_COLUMN,
  },
]

const tmpItems = [
  {
    id: '0',
    addr: 'groupher.com',
    title: '圣母百花大教堂',
    nation: 'italy',
    imgSrc: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    imgSrc2: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc3: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    // desc: '来为你心爱的产品建立一个反馈社区吧。',
    icon: 'https://assets.groupher.com/icons/pl/javascript.png',
  },
  {
    id: '1',
    addr: 'elixir.com',
    title: '威尼斯总督府',
    nation: 'italy',
    imgSrc: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc2: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc3: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    // desc: '来为你心爱的产品建立一个反馈社区吧。',
    icon: 'https://assets.groupher.com/icons/pl/elixir.png',
  },
  {
    id: '2',
    addr: 'groupher.com',
    title: '圣母百花大教堂',
    nation: 'italy',
    imgSrc: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    imgSrc2: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc3: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    // desc: '来为你心爱的产品建立一个反馈社区吧。',
    icon: 'https://assets.groupher.com/icons/pl/javascript.png',
  },
  {
    id: '3',
    addr: 'elixir.com',
    title: '威尼斯总督府',
    nation: 'italy',
    imgSrc: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc2: 'https://assets.groupher.com/navi/arch/wns.jpg',
    imgSrc3: 'https://assets.groupher.com/navi/arch/wqsqpsngny.jpeg',
    // desc: '来为你心爱的产品建立一个反馈社区吧。',
    icon: 'https://assets.groupher.com/icons/pl/elixir.png',
  },
]

const ImageGallery = ({ items, galleryType }) => {
  const [activeGalleryType, setActiveGalleryType] = useState(galleryType)

  let GalleryContent

  switch (activeGalleryType) {
    case GALLERY.TWO_COLUMN: {
      GalleryContent = <TwoColumnGallery items={items} />
      break
    }
    case GALLERY.THREE_COLUMN: {
      GalleryContent = <ThreeColumnGallery items={items} />
      break
    }
    case GALLERY.MASONRY_COLUMN: {
      GalleryContent = <MasonryGallery items={items} />
      break
    }
    default: {
      GalleryContent = <MainColumnGallery items={items} />
      break
    }
  }

  return <Wrapper>{GalleryContent}</Wrapper>
}

ImageGallery.propTypes = {
  items: T.arrayOf(T.object),
  galleryType: T.oneOf([
    GALLERY.MAIN_COLUMN,
    GALLERY.MASONRY_COLUMN,
    GALLERY.TWO_COLUMN,
    GALLERY.THREE_COLUMN,
  ]),
}

ImageGallery.defaultProps = {
  items: tmpItems,
  galleryType: GALLERY.MAIN_COLUMN,
}

export default React.memo(ImageGallery)
