// export const 
export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
export const groundWidth = 1000
export const groundHeight = 600
import Bullet1 from '../bullet/bullet1'
import Bullet2 from '../bullet/bullet2'
import Bullet3 from '../bullet/bullet3'
// import Bullet2 from '../bullet/bullet2'
const ENEMY_IMG_SRC = 'images/iPhone XS.png'
const ENEMY_IMG_SRC1 = 'images/iPhone XS2.png'
const ENEMY_IMG_SRC2 = 'images/iPhone XS3.png'
const ENEMY_IMG_SRC3 = 'images/iPhone XS4.png'
const ENEMY_IMG_SRC4 = 'images/e1.png'
export const enImgs1 = [
  ENEMY_IMG_SRC4,
  ENEMY_IMG_SRC4,
  ENEMY_IMG_SRC4,
  ENEMY_IMG_SRC4,
  ENEMY_IMG_SRC4,
]
const ENEMY_IMG_SRC11 = 'images/e2.png'
const ENEMY_IMG_SRC12 = 'images/2l.png'
const ENEMY_IMG_SRC13 = 'images/3l.png'
const ENEMY_IMG_SRC14 = 'images/4l.png'
const ENEMY_IMG_SRC15 = 'images/5l.png'

export const enImgs2 = [
  ENEMY_IMG_SRC11,
  ENEMY_IMG_SRC11,
  ENEMY_IMG_SRC11,
  ENEMY_IMG_SRC11,
  ENEMY_IMG_SRC11,
]
const bulletImgs = [
  ["images/bullet.png", Bullet2, 'bullet2']
]
export const backButton = (() => {
  let img = new Image()
  img.src = "images/return.png"
  return img
})()
export const playerImag = (i) => {
  let img = new Image()
  img.src = 'images/player/p' + i + '.png'
  return img
}
export const bullets = (() => {
  let list = []
  for (let bimg of bulletImgs) {
    let img = new Image()
    img.src = bimg[0]
    list.push({
      img,
      bulletName: bimg[2],
      bulletClass: bimg[1]
    })
  }
  return list
})()
export const boom1 = (() => {
  let list = []
  for (let i = 0; i < 19; i++) {
    let atlas = new Image()
    atlas.src = `images/explosion${19 - i}.png`
    list.push(atlas)
  }
  return list
})()
export const del1s1 = (() => {
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/bleed.png`
    del1s.push(atlas)
  }
  return del1s
})()