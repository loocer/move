import Animation from '../base/animation'
import DataBus   from '../databus'
import Corpses from './corpses.js'
import { getRoteImg } from '../utils/index'

const ENEMY_IMG_SRC = 'images/iPhone XS.png'
const ENEMY_WIDTH = 50
const ENEMY_HEIGHT = 50

let databus = new DataBus()
let atlas = new Image()
atlas.src = 'images/on-fire.png'
export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
    this.initExplosionAnimation()
  }

  init(speed, lifeValue, x, y, srcImg, del1s ) {
    this.x = x
    this.y = y
    this.srcImg = srcImg
    this.del1s = del1s
    this.frame = 0
    this.score = lifeValue
    this.lifeValue = lifeValue
    this.speed = speed
    this.visible = true
    this.onlive = true
  }
  
  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    // let frames = []
    // const EXPLO_IMG_PREFIX  = 'images/explosion'
    // const EXPLO_FRAME_COUNT = 400
    // for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
    //   // frames.push(EXPLO_IMG_PREFIX + 1 + '.png')
    //   frames.push('images/bg1.jpg')
    // }
    // // frames.push('images/bg1.jpg')
    // this.initFrames(frames)
  }
  playOvers(){
    let c = new Corpses(atlas, this.x - 20, this.y - 20, this.del1s)
    databus.corpses.push(c)
  }
  getPosition(player){
    let px = player.x + player.width/2
    let py = player.y + player.height/2
    let lpx = Math.abs(this.x - player.x)
    let lpy = Math.abs(this.y - player.y)
    let tempx = 0
    let tempy = 0
    if(lpx>lpy){
      tempx = player.x > this.x ? this.x+this.speed:this.x-this.speed
      tempy = player.y > this.y ? this.y + lpy / lpx : this.y - lpy / lpx
    }else{
      tempy= player.y > this.y ? this.y+this.speed : this.y-this.speed
      tempx = player.x > this.x ? this.x + lpx / lpy : this.x - lpx / lpy
    }
    this.x = tempx 
    this.y = tempy 
    getRoteImg({
      x1 : this.x,
      x2 : player.x,
      y1 : this.y,
      y2 : player.y
    },
      this
    )
  }

  // 每一帧更新子弹位置
  update(player) {
    this.img.src = this.srcImg[this.lifeValue]
    this.width = ENEMY_WIDTH + this.lifeValue*10
    this.height = ENEMY_HEIGHT + this.lifeValue * 10
    this.getPosition(player)
    // this.y += this.speed
    // 对象回收
    // if ( this.y > window.innerHeight + this.height )
    //   // databus.pools.recover('enemy', this)
    //   delete this
    //   // databus.removeEnemey(this)
  }
}
