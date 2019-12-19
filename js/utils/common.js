// export const 
export const screenWidth = window.innerWidth
export const screenHeight = window.innerHeight
export const groundWidth = screenWidth + 100
export const groundHeight = screenHeight + 100
import Bullet1 from '../bullet/bullet1'
import Bullet2 from '../bullet/bullet2'
import Bullet3 from '../bullet/bullet3'
import DataBus from '../databus'
import * as pics from './pics.js'
let databus = new DataBus()
export const GAME_IMG = new Map();
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

export const duobi = (() => {
  let imags = []
  for (let i = 1; i < 5; i++) {
    imags.push('images/duobi/' + i + '.png')
  }
  return imags
})()

export const playerImag = (i) => {
  let img = new Image()
  img.src = 'images/player/p' + i + '.png'
  return img
}
export const playerFire = () => {
  let img = new Image()
  img.src = getImgByName('fire-color').url
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
export const boomsImage = () => {
  let list = []
  for (let bo of pics.booms) {
    let atlas = new Image()
    atlas.src = bo.url
    list.push(atlas)
  }
  return list
}
export const bleed1 = (() => {
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/bleed.png`
    del1s.push(atlas)
  }
  return del1s
})()
export const bleed2 = (() => {
  let del1s = []
  for (let i = 0; i < 9; i++) {
    let atlas = new Image()
    atlas.src = `images/ble1ed.png`
    del1s.push(atlas)
  }
  return del1s
})()
export const initPics = () => {
  let del1s = []
  let atlas = new Image()
  atlas.src = `images/bg/init-bg.png`
  del1s.push(atlas)
  let atlas2 = new Image()
  atlas2.src = `images/button/tittle.png`
  atlas2.src = getImgByName('title').url
  del1s.push(atlas2)
  let atlas3 = new Image()
  atlas3.src = `images/button/restar.png`
  del1s.push(atlas3)
  let atlas4 = new Image()
  atlas4.src = `images/bg/runking-bg.png`
  del1s.push(atlas4)
  return del1s
}
export const biHuBody = (() => {
  let atlas = new Image()
  atlas.src = `images/body/bihu.png`
  return atlas
})()
export const boomIcon = () => {
  let atlas = new Image()
  atlas.src = getImgByName('boom-icon').url
  return atlas
}
export const speedIcon = () => {
  let atlas = new Image()
  atlas.src = getImgByName('addspeed-icon').url
  return atlas
}
export const yellowBug_Image = () => {
  let list = []
  for (let i = 1; i < 21; i++) {
    let atlas = getImgByName('yellowBugs' + i).url
    list.push(atlas)
  }
  for (let i = 20; i > 0; i--) {
    let atlas = getImgByName('yellowBugs' + i).url
    list.push(atlas)
  }
  return list
}
const spider = () => {
  let list = []
  for (let i = 1; i < 6; i++) {
    let atlas = getImgByName('antBugs' + i).url
    list.push(atlas)
  }
  return list
}
const bihu = () => {
  let list = []
  for (let i = 1; i < 6; i++) {
    let atlas = getImgByName('bihuBugs' + i).url
    list.push(atlas)
  }
  return list
}
export const loadingImage = ()=>{
  GAME_IMG.set('spider', spider())
  GAME_IMG.set('yellow_bugs', yellowBug_Image())
  GAME_IMG.set('bihu_bugs', bihu())
}

const getImgByName = (name) => {
  for (let obj of databus.allImages) {
    if (obj.name == name) {
      return obj
    }
  }
}
