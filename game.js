import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
import DataBus from './js/databus'
import {
  netResourse
} from './js/utils/pics.js'
import {
  loadingImage
} from './js/utils/common.js'
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from './js/utils/common'
let databus = new DataBus()
let image = wx.createImage()
image.src = 'images/bg/loader.png'

let ctx = canvas.getContext('2d')
const wground = groundWidth
const hground = groundHeight

let sysInfo = wx.getSystemInfoSync(),
  width = sysInfo.windowWidth,
  height = sysInfo.windowHeight;
const renderLoding = (ctx, finish) => {
  let length = (screenWidth - 300) / 2
  let leftP = (screenWidth - 386) / 2
  // let iniY = (screenHeight - panelWidth * (200 / 470)) / 2 
  /*---------------------外框-------------------------》*/

  ctx.lineWidth = 1;
  ctx.strokeStyle = "#82E4F2";
  ctx.beginPath();
  ctx.arc(leftP, screenHeight - 100, 8, Math.PI / 2, Math.PI / 2 * 3, false);

  ctx.moveTo(leftP, screenHeight - 108);
  ctx.lineTo(screenWidth - leftP, screenHeight - 108);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(leftP, screenHeight - 92);
  ctx.lineTo(screenWidth - leftP, screenHeight - 92);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(screenWidth - leftP, screenHeight - 100, 8, Math.PI / 2 * 3, Math.PI / 2, false);
  ctx.stroke();

  /*----------------------------------------------《*/
  let langthWidth = screenWidth - 2 * leftP
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(leftP, screenHeight - 100);
  ctx.lineTo(langthWidth * finish + leftP, screenHeight - 100);
  ctx.stroke();
  if (finish == 1) {
    new Main(ctx)
  }
}
const initRender = (ctx, core) => {
  let panelWidth = 400
  let iniY = (screenHeight - panelWidth * (200 / 470)) / 2
  let iniX = screenWidth / 2 - panelWidth / 2
  ctx.clearRect(0, 0, groundWidth, groundHeight)
  ctx.fillStyle = "#82E4F2"
  ctx.font = "20px Arial"
  ctx.fillText(~~core + '%',
    screenWidth / 2 - 20,
    iniY + panelWidth * (200 / 470) - 40
  )
  ctx.drawImage(image, 0, 0, 470, 200, iniX, iniY - 50, panelWidth, panelWidth * (200 / 470))
  console.log(core / 100, core)
  renderLoding(ctx, core / 100)
}
wx.setScreenBrightness({
  value: .8
})
wx.showShareMenu({
  withShareTicket: true
})
wx.onShareAppMessage(function() {
  return {
    title: '哇，好燃得射击游戏？',
    // imageUrlId: 'EaPjTeGFSY-aOIUlhIIWOw',
    imageUrl: 'images/share.png',
  }
})
wx.getSystemInfo({
  success(res) {
    if (res.system.substring(0, 3) == 'ios') {
      wx.setPreferredFramesPerSecond(20)
    } else {
      wx.setPreferredFramesPerSecond(40)
    }
  }
})




canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);



image.onload = function() {
  wx.cloud.init({
    env: 'test-x1dzi'
  })
  let list = []
  let index = 0
  for (let obb of netResourse) {
    wx.cloud.downloadFile({
      fileID: obb.fileId, // 文件 ID
      success: res => {
        index++
        // 返回临时文件路径
        let obj = obb
        obj.url = res.tempFilePath
        list.push(obj)
        if (netResourse.length == list.length) {
          databus.allImages = list
          loadingImage()
          new Main(ctx)
        }
        initRender(ctx, index / netResourse.length * 100)
      },
      fail: console.error
    })
  }
}

