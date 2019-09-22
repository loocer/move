import Player     from './player/index'
import CreateEnemyt from './npc/createEnemyt'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import HandShank from './runtime/handshank'
import Righthandshank from './runtime/righthandshank.js'
import Music      from './runtime/music'
import { getRoteImg }  from './utils/index'
import DataBus    from './databus'
import Gamecreate from './gameTools/create'
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from './utils/common'


let ctx = canvas.getContext('2d')
const wground = groundWidth
const hground = groundHeight
// canvas.width = screenWidth
// canvas.height = screenHeight

let sysInfo = wx.getSystemInfoSync(), width = sysInfo.windowWidth, height = sysInfo.windowHeight;

canvas.style.width = width + "px";
canvas.style.height = height + "px";
canvas.height = height * window.devicePixelRatio;
canvas.width = width * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);



let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas


let databus = new DataBus(ctx)
let createEnemy = new CreateEnemyt(ctx)
let showUserStorageFlag = true
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId    = 0
    
    
    this.restart()
  }

  restart() {
    databus.reset(ctx)

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg       = new BackGround(ctx)
    this.player   = new Player(ctx)
    this.gameinfo = new GameInfo()
    this.righthandshank = new Righthandshank()
    this.handShank = new HandShank(this.righthandshank)
    this.music    = new Music()
    this.bindLoop     = this.loop.bind(this)
    this.hasEventBind = false
    this.gamecreate = new Gamecreate()
    canvas.addEventListener('touchstart', this.handShank.touchstartEvent)
    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.frame % 1e2 ===0 ) {
      
      createEnemy.createEnemy()
      // enemy.init(6)
     
    }
    if (databus.frame == 1e4) {
      databus.frame = 0
    }
    if (databus.frame == 2*1e3) {
      databus.createEnemysStatus = 3
    }
    if (databus.frame == 1e3 ){
      databus.createEnemysStatus =2
    }
    if (databus.frame == 0) {
      databus.createEnemysStatus = 1
    }
    
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this
   
    databus.bullets.forEach((bullet) => {
      let temp = []
      for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
        let enemy = databus.enemys[i]
        if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
          bullet.visible = false
          databus.pools.recover('bullet', bullet)
          if (--enemy.lifeValue==0){
            databus.score += enemy.score
            enemy.visible = false
            enemy.playOvers()
            databus.pools.recover('enemy',enemy)
          }
        }
      }
    })
    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]
      databus.gameTools.forEach((item) => {
        if(item.checkIsFingerOnEnemy(enemy)){
          enemy.visible = false
          enemy.playOvers()
          databus.pools.recover('enemy', enemy)
        }
      })
    
      if ( this.player.isCollideWith(enemy) ) {
        databus.gameOver = true
        break
      }
    }
  }
  rowMove(ctx){
    let tempX = this.player.x > databus.playTempX ? Math.abs(this.player.x - databus.playTempX) : -Math.abs(this.player.x - databus.playTempX)
    databus.playTempX = this.player.x
    this.handShank.x += tempX
    this.righthandshank.x += tempX
    databus.transX = this.handShank.x - 100
    ctx.translate(-tempX, 0)
    // if (this.handShank.touched && !this.handShank.isInsite) {//
    //   this.handShank.tx += tempX
    // }
  }
  colMove(ctx){
    let tempY = this.player.y > databus.playTempY ? Math.abs(this.player.y - databus.playTempY) : -Math.abs(this.player.y - databus.playTempY)
    databus.playTempY = this.player.y
    this.handShank.y += tempY
    this.righthandshank.y += tempY
    databus.transY = this.handShank.y - (screenHeight - 160)
    ctx.translate(0, -tempY)
    // if (this.handShank.touched && !this.handShank.isInsite) {
    //   this.handShank.ty += tempY
    // }
  }
  //视觉移动 不至于第一人称跑出屏幕
  cameraMove(ctx){
    if (this.handShank.touched
      && (this.player.x + databus.moveX) > 0
      && (this.player.x + databus.moveX) < wground - 40
    ) {
      this.player.x += (databus.moveX*2)
    }
    if (this.handShank.touched
      && (this.player.y + databus.moveY) > 0
      && (this.player.y + databus.moveY) < hground - 40
    ){
      this.player.y += (databus.moveY*2)
    }
    if (this.handShank.touched
      && (this.player.x + databus.moveX) > screenWidth / 2
      && (this.player.x + databus.moveX) < wground - screenWidth / 2
    ) {
      this.rowMove(ctx)
      
    }
    if (this.handShank.touched
      && (this.player.y + databus.moveY) > screenHeight/2 
      && (this.player.y + databus.moveY) < hground - screenHeight / 2
    ){
      this.colMove(ctx)
      
    } 
    // if (this.handShank.isInsite) {//点击在手柄内
    if (this.handShank.touched&&databus.x){
      this.handShank.tx = databus.x + databus.transX - 60
      this.handShank.ty = databus.y + databus.transY - 60
    }
  
    let pobj = {}
    pobj.x1 = databus.x + databus.transX//点击
    pobj.x2 = this.handShank.x + 60
    pobj.y1 = (databus.y + databus.transY)
    pobj.y2 = this.handShank.y + 60
    getRoteImg(pobj, this.handShank)
  }
  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
     e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (   x >= area.startX
        && x <= area.endX
        && y >= area.startY
        && y <= area.endY  )
      this.restart()
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // ctx.translate(0, -1)
    this.bg.render(ctx)
    
    databus.bullets
          .concat(databus.enemys)
          .forEach((item) => {
              item.drawToCanvas(ctx)
            })
    databus.gameTools.forEach((item)=>{
      item.drawToCanvas(ctx)
    })
    this.cameraMove(ctx)
    
    this.player.drawToCanvas(ctx)
    
    databus.animations.forEach((ani) => {
      if ( ani.isPlaying ) {
        ani.aniRender(ctx)
      }
    })

    this.gameinfo.renderGameScore(ctx, databus.score)
    this.handShank.renderHandShank(ctx, this.player)
    this.righthandshank.renderHandShank(ctx)
    databus.corpses.forEach((item) => {
      if (item.visible) {
        item.render(ctx)
      }
    })
    // ctx.drawImage(sharedCanvas, databus.transX, databus.transY, 1200, 800)
    // openDataContext.postMessage({
    //   data: databus,
    //   command: 'render'
    // })
    // 游戏结束停止帧循环
    // this.gameinfo.renderGameOver(ctx, databus.score)
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.score)
      showUserStorageFlag&&this.addNewScore()
      if ( !this.hasEventBind ) {
        showUserStorageFlag = true
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.removeEventListener('touchstart',this.handShank.touchstartEvent)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }
  addNewScore(){
    showUserStorageFlag = false
    ctx.drawImage(sharedCanvas, databus.transX, databus.transY, 1200, 800)
    openDataContext.postMessage({
      data: databus,
      command: 'addNewScore'
    })
  }
  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update()
    databus.corpses.forEach((item) => {
      item.update()
    })
    databus.bullets
           .concat(databus.enemys)
           .forEach((item) => {
             item.update(this.player)
            })
    databus.gameTools.forEach((item) => {
      item.update(this.player)
    })
    this.enemyGenerate()

    this.collisionDetection()
    
    if (databus.frame % 10 === 0 && this.righthandshank.touched ) {

      this.player.shoot()
      // this.music.playShoot()
    }
    this.player.rotate = this.righthandshank.rotate
    //--------------回收----------
    let temp = []
    databus.corpses.forEach((item) => {
      if (item.visible) {
        temp.push(item)
      }
    })
    databus.corpses = temp
    temp = []
    databus.enemys.forEach((item) => {
      if (item.visible) {
        temp.push(item)
      }
    })
    databus.enemys = temp
    temp = []
    databus.bullets.forEach((item) => {
      if (item.visible) {
        temp.push(item)
      }
    })
    databus.bullets = temp
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    wx.triggerGC()
    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
