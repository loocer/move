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
import DataBus from '../databus'

let databus = new DataBus()
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
export const duobi = (() => {
  let imags = []
  for (let i = 1; i < 5; i++) {
    imags.push('images/duobi/' + i + '.png')
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
export const boomsImage = () => {
  let list = []
  for (let bo of booms) {
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
  for (let i = 1; i <21; i++) {
    let atlas =  getImgByName('yellowBugs'+i).url
    list.push(atlas)
  }
  for (let i = 20; i >0; i--) {
    let atlas = getImgByName('yellowBugs' + i).url
    list.push(atlas)
  }
  return list
}
const icon = [{
    name: 'boom-icon',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/icon/boom.png',
  },
  {
    name: 'addspeed-icon',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/icon/add-speed.png',
  }
]
const booms = [{
    name: 'boom1',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/1.png',
  },
  {
    name: 'boom2',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/2.png',
  },
  {
    name: 'boom3',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/3.png',
  },
  {
    name: 'boom4',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/4.png',
  },
  {
    name: 'boom5',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/5.png',
  }
]
const yellowBug = (() => {
  let list = []
  for (let i = 1; i < 21; i++) {
    list.push({
      name: 'yellowBugs' + i,
      fileId: `cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/enemy_yellowBug/${i}.png`,
    })
  }
  return list
})()
export const netResourse = [{
  name: 'title',
  fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/button/tittle.png',
}, ...booms, ...icon, ...yellowBug]
const getImgByName = (name) => {
  for (let obj of databus.allImages) {
    if (obj.name == name) {
      return obj
    }
  }
}