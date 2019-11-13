import DataBus from '../databus'
let databus = new DataBus()
import {
  groundWidth,
  groundHeight,
  screenHeight,
  screenWidth,
  bloodBg,
  scoreBg,
  initPics
} from '../utils/common.js'
let leftP = (screenWidth - 386) / 2
export default class GameInfo {
  constructor() {
    this.bg = initPics[0]
    this.button = initPics[1]
    this.button2 = initPics[2]
  }
  renderGameScore(ctx, score) {

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"
    ctx.fillText(
      score,
      leftP + databus.transX - 150,
      25 + databus.transY
    )
  }
  
  checkIsFingerOnAir=(x, y)=> {
    console.log(x >= this.start.startX, y >= this.start.startY, x <= this.start.endX, y <= this.start.endY, '++++++++++++++++++++')
    return !!(x >= this.start.startX
      && y >= this.start.startY
      && x <= this.start.endX
      && y <= this.start.endY
    )
  }
  touchstartEvent = (e) => {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
    e.preventDefault()
    for (let p of e.touches) {
      let x = p.clientX
      let y = p.clientY
      if (this.checkIsFingerOnAir(x, y)) {
        console.log(999999999999999)
      }
    }

  }
  initRender(ctx){
    let panelWidth = 400
    let iniY = (screenHeight - panelWidth * (648 / 858)) / 2 + databus.transY
    let iniX = screenWidth / 2 - 200 + databus.transX
    
    ctx.drawImage(this.bg, 0, 0, 1600, 750, databus.transX, databus.transY,screenWidth , screenHeight )
    ctx.drawImage(this.button, 0, 0, 858, 648, screenWidth / 2 - panelWidth/2 + databus.transX, (screenHeight - panelWidth * (648 / 828)) / 2 + databus.transY, panelWidth, panelWidth * (628 / 848))

    this.start = {
      startX: screenWidth / 2 - 150 + databus.transX,
      startY: panelWidth * (628 / 848) * (37 / 65) + iniY,
      endX: iniX + panelWidth,
      endY: panelWidth * (628 / 848) * (37 / 65) + iniY + (panelWidth / 848 * 120)
    }
    this.runking={

    }
  }
  renderPlayerBleed(ctx, player) {
    player.lifeValue = player.lifeValue > player.allLifeValue ? player.allLifeValue : player.lifeValue
    let length = databus.transX + (screenWidth - 300) / 2
    /*---------------------背景框-------------------------*/
    ctx.drawImage(scoreBg, leftP + databus.transX - 162, databus.transY)
    ctx.drawImage(bloodBg, leftP + databus.transX - 18, databus.transY)
    /*---------------------外框-------------------------》*/

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00ff00";
    ctx.beginPath();
    ctx.arc(leftP + databus.transX, databus.transY + 20, 8, Math.PI / 2, Math.PI / 2 * 3, false);

    ctx.moveTo(leftP + databus.transX, databus.transY + 12);
    ctx.lineTo(screenWidth - leftP + databus.transX, databus.transY + 12);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(leftP + databus.transX, databus.transY + 28);
    ctx.lineTo(screenWidth - leftP + databus.transX, databus.transY + 28);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(screenWidth - leftP + databus.transX, databus.transY + 20, 8, Math.PI / 2 * 3, Math.PI / 2, false);
    ctx.stroke();

    /*---------------------外框-------------------------《*/
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#00ff00";
    ctx.beginPath();
    ctx.arc(leftP + databus.transX, databus.transY + 20, 6, Math.PI / 2, Math.PI / 2 * 3, false);
    ctx.fill();
    ctx.beginPath();
    // ctx.moveTo(leftP + databus.transX, databus.transY+30);
    // ctx.lineTo(screenWidth - leftP, databus.transY+30);

    ctx.fillRect(leftP + databus.transX, databus.transY + 14, 300 * (player.lifeValue / player.allLifeValue), 12);
    ctx.strokeStyle = "#00ff00";
    // ctx.lineJoin = "round";
    ctx.stroke();
  }
  renderGameOver(ctx, score) {
    let panelWidth = 200
    let iniY = (screenHeight - panelWidth * (648 / 273)) / 2 + databus.transY
    let iniX = screenWidth / 2 - 200 + databus.transX
    ctx.fillStyle = 'rgba(0, 0, 0, .7)';
    ctx.fillRect(0, 0, groundWidth, groundHeight);
    ctx.drawImage(this.button2, 0, 0, 273, 220, screenWidth / 2 - panelWidth / 2 + databus.transX, (screenHeight - panelWidth * (220 / 273)) / 2 + databus.transY, panelWidth, panelWidth * (220 / 273))
    this.btnShare = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 95,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 20
    }
  }
}