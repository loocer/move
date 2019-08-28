import Pool from './base/pool'

let instance

const screenWidth = window.innerWidth 
const screenHeight = window.innerHeight 
/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    console.log('------------555555555-------------')
    console.log(screenWidth)
    console.log(screenHeight)
    this.transX = 0
    this.transY = 0

    this.playTempX = screenWidth/2
    this.playTempY = screenHeight/2

    this.screenWidth = 1200
    this.screenHeight = 800

    this.moveX = 0//手柄操作位移
    this.moveY = 0
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.transX = 0 
    this.transY = 0

    this.moveX = 0//手柄操作位移
    this.moveY = 0

    this.shootX = 0
    this.shootY = 0

    this.frame      = 0
    this.score      = 0
    this.bullets    = []
    this.enemys     = []
    this.animations = []
    this.gameOver   = false
  }

  /**
   * 回收敌人，进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    let temp = this.enemys.shift()

    temp.visible = false

    this.pool.recover('enemy', enemy)
  }

  /**
   * 回收子弹，进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    let temp = this.bullets.shift()

    temp.visible = false

    this.pool.recover('bullet', bullet)
  }
}
