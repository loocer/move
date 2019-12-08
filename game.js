import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
import DataBus from './js/databus'
import {
  netResourse
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
  // ctx.lineWidth = 1;
  // ctx.strokeStyle = "#fff";
  // ctx.beginPath();
  // ctx.arc(100, 20, 8, 0, Math.PI / 2, false);


  let panelWidth = 400
  let iniY = (screenHeight - panelWidth * (200 / 470)) / 2
  let iniX = screenWidth / 2 - panelWidth / 2
  ctx.clearRect(0, 0, groundWidth, groundHeight)
  ctx.fillStyle = "#82E4F2"
  ctx.font = "20px Arial"
  ctx.fillText(
    ~~core + '%',
    screenWidth / 2 - 20,
    iniY + panelWidth * (200 / 470) - 40
  )
  ctx.drawImage(image, 0, 0, 470, 200, iniX, iniY-50, panelWidth, panelWidth * (200 / 470))

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
    title: '孤独的828战士，会不会成为第829个牺牲掉的战士呢？',
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


let ctx = canvas.getContext('2d')
const wground = groundWidth
const hground = groundHeight

let sysInfo = wx.getSystemInfoSync(),
  width = sysInfo.windowWidth,
  height = sysInfo.windowHeight;

canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);



image.onload = function () {
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
          // new Main(ctx)
        }
        initRender(ctx, index / netResourse.length * 100)
      },
      fail: console.error
    })
  }
}


//------------------------------------------------------------

// wx.cloud.downloadFile({
//   fileID: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/runking-bg.png', // 文件 ID
//   success: res => {
//     // 返回临时文件路径
//     console.log(res)
//   },
//   fail: console.error
// })

// let context = canvas.getContext('2d')
// let openDataContext = wx.getOpenDataContext()
// let sharedCanvas = openDataContext.canvas

// let loop = ()=>{
//   context.drawImage(sharedCanvas, 0, 0,1000,1000)
//     // 主域绘制
//   openDataContext.postMessage({
//     command: 'render'
//   })
// }
// setInterval(loop,100)