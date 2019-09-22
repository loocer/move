import Sprite from '../base/sprite'
import Bullet from '../bullet/bullet2'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero1.png'
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 50
let databus = new DataBus()

export default class Halo extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = databus.playTempX
    this.y = databus.playTempY
  }
}
