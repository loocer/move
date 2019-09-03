import DataBus from '../databus'
import { getRoteImg } from '../utils/index'
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let atlas = new Image()
let atlas2 = new Image()
let atlas3 = new Image()
let databus = new DataBus()
let y = 30
const PLAYER_WIDTH = 120
const PLAYER_HEIGHT = 120
atlas.src = 'images/handshank.png'
atlas2.src = 'images/on-fire.png'
// atlas3.src = 'images/on-way.png'
export default class RightHandShank {
  constructor() {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.x = screenWidth - PLAYER_WIDTH - 40
    this.y = screenHeight - PLAYER_HEIGHT - 40
    // this.x = 0
    // this.y = 0
    this.tx = screenWidth - PLAYER_WIDTH - 40
    this.ty = screenHeight - PLAYER_HEIGHT - 40

    this.touchedx = screenWidth - PLAYER_WIDTH - 40
    this.touchedy = screenHeight - PLAYER_HEIGHT - 40

    this.rotate = 0
    this.width = PLAYER_WIDTH
    this.height = PLAYER_HEIGHT
    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []
    // 初始化事件监听
    // this.initEvent()
  }

  renderHandShank(ctx) {
    ctx.drawImage(
      atlas,
      0, 0, 300, 300,
      this.x,
      this.y,
      this.width, this.height
    )
    ctx.save()
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2)
    // console.log(player.rotate)
    ctx.rotate(this.rotate * Math.PI / 180)
    // ctx.drawImage(
    //   atlas3,
    //   0, 0, 300, 184,
    //   -60,
    //   -74,
    //   120, 94
    // )
    ctx.drawImage(
      atlas2,
      0, 0, 300, 300,
      -this.width / 2,
      -this.height / 2,
      this.width, this.height
    )
    ctx.restore()
    
  }
  _formatMovePosition(x, y) {
    let centerX = ~~(this.x - databus.transX + this.width / 2)
    let centerY = ~~(this.y - databus.transY + this.height / 2)
    let tempx = Math.abs((x - centerX) / 20) > 2 ? 2 : Math.abs((x - centerX) / 20)
    let tempy = Math.abs((y - centerY) / 20) > 2 ? 2 : Math.abs((y - centerY) / 20)
    databus.shootX = x > centerX ? tempx : -tempx
    databus.shootY = y > centerY ? tempy : -tempy
    getRoteImg({
      x1: databus.shootX,
      x2: 0,
      y1: databus.shootY,
      y2: 0,
    },
      this
    )
  }
  /**
    * 当手指触摸屏幕的时候
    * 判断手指是否在飞机上
    * @param {Number} x: 手指的X轴坐标
    * @param {Number} y: 手指的Y轴坐标
    * @return {Boolean}: 用于标识手指是否在飞机上的布尔值
    */
  checkIsFingerOnAir(x, y) {
    let thisx = this.x - databus.transX
    let thisy = this.y - databus.transY
    const deviation = 30
    console.log(x >= thisx - deviation)
    console.log(y >= thisy - deviation)
    console.log(x <= thisx + this.width + deviation)
    console.log(y <= thisy + this.height + deviation)
    return !!(x >= thisx - deviation
      && y >= thisy - deviation
      && x <= thisx + this.width + deviation
      && y <= thisy + this.height + deviation)
  }
  /**
   * 玩家响应手指的触摸事件
   * 改变战机的位置
   */
  
  renderGameOver(ctx, score) {
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150, screenHeight / 2 - 100, 300, 300)

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 50
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 130
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60,
      screenHeight / 2 - 100 + 180,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40,
      screenHeight / 2 - 100 + 205
    )

    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255
    }
  }
}

