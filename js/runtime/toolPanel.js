import DataBus from '../databus'
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight,
  backButton
} from '../utils/common'
let databus = new DataBus()
let instance
export default class HandShank {
  constructor(temp) {
    this.x = screenWidth - 200
    this.atlas = backButton
    this.y = 10
    this.height = 50
    this.width =50
    if (instance)
      return instance

    instance = this
  }
  checkIsFingerOnAir(x,y){
    const deviation = 10
    let thisx = this.x
    let thisy = this.y 
    return !!(x >= thisx - deviation
      && y >= thisy - deviation
      && x <= thisx + this.width + deviation
      && y <= thisy + this.height + deviation)
  }
  drawToCanvas(ctx) {
      // ctx.drawImage(
      //   this.atlas,
      //   this.x + databus.transX,
      //   this.y + databus.transY,
      //   this.width,
      //   this.height
      // )
  }
  updata(){
    if (databus.showUserStorageFlag && databus.panelPosition.rankingX < -20) {
      databus.panelPosition.rankingX += 20
    }
    if (!databus.showUserStorageFlag && databus.panelPosition.rankingX > -500) {
      databus.panelPosition.rankingX -= 20
    }
  }
}