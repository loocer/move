import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
wx.showShareMenu({
  withShareTicket: true
})
wx.onShareAppMessage(function () {
  return {
    title: '孤独的828战士，会不会成为第829个牺牲掉的战士呢？',
    // imageUrlId: 'EaPjTeGFSY-aOIUlhIIWOw',
    imageUrl: '/images/bg.png',
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

new Main()
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