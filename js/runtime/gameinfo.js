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
    this.button3 = initPics[3]
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
    return !!(x >= this.start.startX
      && y >= this.start.startY
      && x <= this.start.endX
      && y <= this.start.endY
    )
  }
  checkIsFingerRunking1 = (x, y)=>{
    return !!(x >= this.runking1.startX
      && y >= this.runking1.startY
      && x <= this.runking1.endX
      && y <= this.runking1.endY
    )
  }
  runKingRender(ctx){
    let panelWidth =400
    let iniY = (screenHeight - panelWidth * (720 / 910)) / 2 + databus.transY
    let iniX = screenWidth / 2 - panelWidth/2 + databus.transX

    ctx.drawImage(this.bg, 0, 0, 910, 720, databus.transX, databus.transY, screenWidth, screenHeight)
    ctx.drawImage(this.button3, 0, 0, 910, 720, iniX, iniY, panelWidth, panelWidth * (720 / 910))

    this.runkingStart = {
      startX: iniX + 310 * panelWidth / 910 + databus.transX,
      startY: iniY + 600 * panelWidth / 910 + databus.transY,
      endX: iniX + 650 * panelWidth / 910 + databus.transX,
      endY: iniY + 710 * panelWidth / 910 + databus.transY,
    }
    
  }
  initRender(ctx){
    let panelWidth = 300
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
    this.runking1={
      startX: screenWidth / 2 - 150 + databus.transX,
      startY: panelWidth * (628 / 848) * (514 / 650) + iniY,
      endX: iniX + panelWidth,
      endY: panelWidth * (628 / 848) * (630 / 650) + iniY
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
    let iniY = (screenHeight - panelWidth * (220 / 285)) / 2 + databus.transY
    let iniX = screenWidth / 2 - panelWidth / 2 + databus.transX
    ctx.fillStyle = 'rgba(0, 0, 0, .7)';
    ctx.fillRect(0, 0, groundWidth, groundHeight);
    ctx.drawImage(this.button2, 0, 0, 285, 220, iniX, iniY, panelWidth, panelWidth * (220 / 285))
    this.restart = {
      startX: iniX,
      startY: iniY + 85 * (panelWidth / 285),
      endX: iniX + panelWidth,
      endY: iniY + 140 * (panelWidth / 270)
    }
    this.share = {
      startX: iniX,
      startY: iniY,
      endX: iniX + panelWidth,
      endY: iniY + 60 * (panelWidth / 270)
    }
    this.runking = {
      startX: iniX,
      startY: iniY + 170 * (panelWidth / 285),
      endX: iniX + panelWidth,
      endY: iniY + 235 * (panelWidth / 270)
    }
  }
}