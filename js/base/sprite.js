/**
 * 游戏基础的精灵类
 */
import DataBus from '../databus'
let databus = new DataBus()
export default class Sprite {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0, rotate = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }
  /**
   * 将精灵图绘制在canvas上
   */
  drawToCanvas(ctx) {
    if ( !this.visible )
      return
    // ctx.translate(-(this.x - databus.transX + this.width / 2), -(this.y - databus.transY + this.height / 2))
    // ctx.translate(this.x - databus.transX + this.width/2, this.y - databus.transY+ this.height/2)
    // ctx.translate(-this.x , -this.y)

    // ctx.drawImage(
    //   this.img,
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // )
    ctx.save()
    ctx.translate(this.x , this.y  )
    ctx.rotate(this.rotate * Math.PI / 180)
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    )
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, 15+2 * this.lifeValue , 0, 2 * Math.PI);
    // ctx.stroke();
    ctx.restore()

  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x 
    let spY = sp.y 
    let tX = this.x
    let tY = this.y
    if ( !this.visible || !sp.visible )
      return false
    return (
      Math.sqrt((spX - tX) * (spX - tX) +
        (spY - tY) * (spY - tY)) < (this.width / 3)
    )
    // return !!(   spX >= this.x
    //           && spX <= this.x + this.width
    //           && spY >= this.y
    //           && spY <= this.y + this.height  )
  }
}
