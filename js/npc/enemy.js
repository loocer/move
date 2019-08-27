import Animation from '../base/animation'
import DataBus   from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH   = 80
const ENEMY_HEIGHT  = 80

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor() {
    super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)

    this.initExplosionAnimation()
  }

  init(speed) {
    this.x = rnd(0, window.innerWidth - ENEMY_WIDTH)
    this.y = 0

    this[__.speed] = speed

    this.visible = true
  }
  
  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    let frames = []

    const EXPLO_IMG_PREFIX  = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    for ( let i = 0;i < EXPLO_FRAME_COUNT;i++ ) {
      frames.push(EXPLO_IMG_PREFIX + (i + 1) + '.png')
    }

    this.initFrames(frames)
  }
  getPosition(player){
    // console.log(this.x, this.y, pose, 'xxxxxxxxxxxxxxxxxxxxxx')
    let px = player.x + player.width/2
    let py = player.y + player.height/2
    let lpx = Math.abs(this.x - player.x)
    let lpy = Math.abs(this.y - player.y)
    let tempx = 0
    let tempy = 0
    if(lpx>lpy){
      tempx = player.x > this.x ? this.x+1:this.x-1
      tempy = player.y > this.y ? this.y + lpy / lpx : this.y - lpy / lpx
    }else{
      tempy= player.y > this.y ? this.y+1 : this.y-1
      tempx = player.x > this.x ? this.x + lpx / lpy : this.x - lpx / lpy
    }
    // let pose = (this.x - px)/(this.y - py)
    // let l = Math.sqrt((this.x - px) * (this.x - px) + (this.y - py) * (this.y - py)) - 1
    // let y = Math.sqrt(l*l/(pose*pose+1))
    // let x = y*pose
    // console.log(y,x,'-[-[[-[[-')
    // if(x>0){
    this.x = tempx
    this.y = tempy
    // }
    // console.log(y, x, l, this.x, this.y, pose,'yyyyyyyyyyyyyyyy')
  }
  // 每一帧更新子弹位置
  update(player) {
    this.getPosition(player)
    // this.y += this[__.speed]

    // 对象回收
    if ( this.y > window.innerHeight + this.height )
      delete this
      // databus.removeEnemey(this)
  }
}
