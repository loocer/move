// export const 
export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
export const groundWidth = screenWidth
export const groundHeight = screenHeight
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
export const bloodBg = (() => {
  let img = new Image()
  img.src = 'images/bg/Rectangle.png'
  return img
})()
export const scoreBg = (() => {
  let img = new Image()
  img.src = 'images/bg/score-bg.png'
  return img
})()
export const backButton = (() => {
  let img = new Image()
  img.src = "images/return.png"
  return img
})()
export const bihu = (() => {
  let imags = []
  for (let i = 1; i < 5; i++) {
    imags.push('images/bihu/' + i + '.png')
  }
  return imags
})()
export const spider = (() => {
  let imags = []
  for (let i = 1; i < 5; i++) {
    imags.push('images/spider/' + i + '.png')
  }
  return imags
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
    atlas.src = `images/return.png`
    list.push(atlas)
  }
  return list
})()
export const bleed1 = (() => {
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/bleed.png`
    del1s.push(atlas)
  }
  return del1s
})()
export const initPics = (() => {
  let del1s = []
  let atlas = new Image()
  atlas.src = `images/bg/init-bg.png`
  del1s.push(atlas)
  let atlas2 = new Image()
  atlas2.src = `images/button/tittle.png`
  del1s.push(atlas2)
  let atlas3 = new Image()
  atlas3.src = `images/button/restar.png`
  del1s.push(atlas3)
  return del1s
})()