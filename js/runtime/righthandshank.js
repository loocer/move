import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight


let atlas = new Image()
let databus = new DataBus()
let y = 30
const PLAYER_WIDTH = 120
const PLAYER_HEIGHT = 120
atlas.src = 'images/Common.png'

export default class RightHandShank {
  constructor() {
    // 玩家默认处于屏幕底部居中位置
    // this.x = 100
    this.x = screenWidth - PLAYER_WIDTH - 40
    this.y = screenHeight - PLAYER_HEIGHT - 40
    // this.x = 0
    // this.y = 0
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
      0, 0, 100, 100,
      this.x,
      this.y,
      this.width, this.height
    )
  }
  _formatMovePosition(x, y) {
    // x = databus.transX + x
    // y = databus.transY + y
    let centerX = ~~(this.x - databus.transX + this.width / 2)
    let centerY = ~~(this.y - databus.transY + this.height / 2)
    let tempx = Math.abs((x - centerX) / 20) > 2 ? 2 : 1
    let tempy = Math.abs((y - centerY) / 20) > 2 ? 2 : 1
    databus.moveX = x > centerX ? tempx : -tempx
    databus.moveY = y > centerY ? tempy : -tempy
    console.log(centerX, this.x, databus.transX, '-------------------')
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

