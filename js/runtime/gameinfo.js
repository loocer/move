import DataBus from '../databus'
let atlas = new Image()
let y = 30
atlas.src = 'images/Common.png'
let databus = new DataBus()
import {
  groundWidth,
  groundHeight,
  screenHeight,
  screenWidth
} from '../utils/common.js'
export default class GameInfo {
  renderGameScore(ctx, score) {
    ctx.fillStyle = "#ffffff"
    ctx.font = "20px Arial"
    ctx.fillText(
      score,
      10 + databus.transX,
      y + databus.transY
    )
  }
  renderPlayerBleed(ctx, player) {
    player.lifeValue = player.lifeValue > player.allLifeValue ? player.allLifeValue : player.lifeValue
    let length = databus.transX + (screenWidth - 300) / 2
    ctx.fillStyle = 'rgba(0,0,0, .3)';
    ctx.fillRect(length, databus.transY, 300, 30);
    ctx.fillStyle = 'rgba(0,206,209, 1)';
    ctx.fillRect(length, databus.transY, 300*(player.lifeValue / player.allLifeValue), 30);
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
      startY: screenHeight / 2 - 100 + 180,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 100 + 255
    }
    this.btnShare = {
      startX: screenWidth / 2 - 40,
      startY: screenHeight / 2 - 95,
      endX: screenWidth / 2 + 50,
      endY: screenHeight / 2 - 20
    }
  }
}