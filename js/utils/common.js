// export const 
export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
export const groundWidth = 1200
export const groundHeight = 800
const ENEMY_IMG_SRC = 'images/iPhone XS.png'
const ENEMY_IMG_SRC1 = 'images/iPhone XS2.png'
const ENEMY_IMG_SRC2 = 'images/iPhone XS3.png'
const ENEMY_IMG_SRC3 = 'images/iPhone XS4.png'
const ENEMY_IMG_SRC4 = 'images/e1.png'
// const ENEMY_IMG_SRC2 = 'images/hero.png'
// export const enImgs1 = [
//   ENEMY_IMG_SRC4,
//   ENEMY_IMG_SRC3,
//   ENEMY_IMG_SRC2,
//   ENEMY_IMG_SRC1,
//   ENEMY_IMG_SRC
// ]
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
// export const enImgs2 = [
//   ENEMY_IMG_SRC11,
//   ENEMY_IMG_SRC12,
//   ENEMY_IMG_SRC13,
//   ENEMY_IMG_SRC14,
//   ENEMY_IMG_SRC15
// ]
export const enImgs2 = [
  ENEMY_IMG_SRC11,
  ENEMY_IMG_SRC11, 
  ENEMY_IMG_SRC11, 
  ENEMY_IMG_SRC11, 
  ENEMY_IMG_SRC11,
]
const ENEMY_IMG_SRC21 = 'images/1h.png'
const ENEMY_IMG_SRC22 = 'images/2h.png'
const ENEMY_IMG_SRC23 = 'images/3h.png'
const ENEMY_IMG_SRC24 = 'images/4h.png'
const ENEMY_IMG_SRC25 = 'images/5h.png'
export const enImgs3 = [
  ENEMY_IMG_SRC21,
  ENEMY_IMG_SRC22,
  ENEMY_IMG_SRC23,
  ENEMY_IMG_SRC24,
  ENEMY_IMG_SRC25
]

export const del1s1 = (()=>{
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/bleed.png`
    del1s.push(atlas)
  }
  return del1s
})()
export const del1s2 = (() => {
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/del2/l${i}.png`
    del1s.push(atlas)
  }
  return del1s
})()