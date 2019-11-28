import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
import DataBus from './js/databus'

let databus = new DataBus()
wx.showShareMenu({
  withShareTicket: true
})
wx.onShareAppMessage(function () {
  return {
    title: '孤独的828战士，会不会成为第829个牺牲掉的战士呢？',
    // imageUrlId: 'EaPjTeGFSY-aOIUlhIIWOw',
    imageUrl: 'images/bleed.png',
  }
})
wx.getSystemInfo({
  success(res) {
    if (res.system.substring(0,3)=='ios'){
      wx.setPreferredFramesPerSecond(20)
    }else{
      wx.setPreferredFramesPerSecond(40)
    }
  }
})
wx.cloud.init({
  env: 'test-x1dzi'
})
wx.cloud.downloadFile({
  fileID: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/button/tittle.png', // 文件 ID
  success: res => {
    // 返回临时文件路径
    databus.testImag = res.tempFilePath
    console.log(res.tempFilePath)
    new Main()
  },
  fail: console.error
})

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