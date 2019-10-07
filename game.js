import './js/libs/weapp-adapter'
import './js/libs/symbol'

import Main from './js/main'
wx.setPreferredFramesPerSecond(60)
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