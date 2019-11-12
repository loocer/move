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
  touchstartEvent = (e) => {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    e.preventDefault()
    for (let p of e.touches) {
      let x = p.clientX
      let y = p.clientY
      if (this.checkIsFingerOnAir(x, y)) {}
      if (toolPanel.checkIsFingerOnAir(x, y)) {
        databus.showUserStorageFlag = !databus.showUserStorageFlag
      }

      if (this.rightHandShank.checkIsFingerOnAir(x, y)) {
        player.shoot()
      }
    }

  }
  initRender(ctx){
    ctx.drawImage(this.bg, 0, 0, 1600, 750, databus.transX, databus.transY,screenWidth , screenHeight )
    ctx.drawImage(this.button, 0, 0, 429, 324, screenWidth/2-150 + databus.transX, (screenHeight - 300 * (324 / 429)) / 2 + databus.transY, 300, 300 * (324 / 429))
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
    ctx.fillStyle = 'rgba(0, 0, 0, .7)';
    ctx.fillRect(0, 0, groundWidth, groundHeight);
    ctx.drawImage(atlas, 0, 0, 119, 108, screenWidth / 2 - 150 + databus.transX, screenHeight / 2 - 200 + databus.transY, 300, 400)

    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"

    ctx.fillText(
      '游戏结束',
      screenWidth / 2 - 40 + databus.transX,
      screenHeight / 2 - 200 + 50 + databus.transY
    )

    ctx.fillText(
      '得分: ' + score,
      screenWidth / 2 - 40 + databus.transX,
      screenHeight / 2 - 200 + 100 + databus.transY
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60 + databus.transX,
      screenHeight / 2 - 100 + 180 + databus.transY,
      120, 40
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60 + databus.transX,
      screenHeight / 2 - 100 + 55 + databus.transY,
      120, 40
    )

    ctx.drawImage(
      atlas,
      120, 6, 39, 24,
      screenWidth / 2 - 60 + databus.transX,
      screenHeight / 2 - 100 + 115 + databus.transY,
      120, 40
    )

    ctx.fillText(
      '重新开始',
      screenWidth / 2 - 40 + databus.transX,
      screenHeight / 2 - 100 + 205 + databus.transY
    )
    ctx.fillText(
      '查看排行',
      screenWidth / 2 - 40 + databus.transX,
      screenHeight / 2 - 100 + 140 + databus.transY
    )
    ctx.fillText(
      '转发复活',
      screenWidth / 2 - 40 + databus.transX,
      screenHeight / 2 - 100 + 80 + databus.transY
    )
    /**
     * 重新开始按钮区域
     * 方便简易判断按钮点击
     */
    this.btnArea = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 + 80,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 + 155
    }
    this.rankIng = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 10,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 + 125
    }
    this.btnShare = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 95,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 20
    }
  }
}