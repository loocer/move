import Player     from './player/index'
import Enemy      from './npc/enemy'
import BackGround from './runtime/background'
import GameInfo   from './runtime/gameinfo'
import HandShank from './runtime/handshank'
import Righthandshank from './runtime/righthandshank.js'
import Music      from './runtime/music'
import { getRoteImg }  from './utils/index'
import DataBus    from './databus'

const screenWidth = window.innerWidth 
const screenHeight = window.innerHeight
const wground = 1200
const hground = 800
canvas.width = screenWidth
canvas.height = screenHeight
let ctx   = canvas.getContext('2d')
let openDataContext = wx.getOpenDataContext()
let sharedCanvas = openDataContext.canvas


let databus = new DataBus(ctx)

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
    if (databus.frame % 10000 === 0 ) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(6)
      databus.enemys.push(enemy)
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    let that = this

    databus.bullets.forEach((bullet) => {
      for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
        let enemy = databus.enemys[i]

        if ( !enemy.isPlaying && enemy.isCollideWith(bullet) ) {
          enemy.playAnimation()
          // that.music.playExplosion()

          bullet.visible = false
          databus.score  += 1

          break
        }
      }
    })

    for ( let i = 0, il = databus.enemys.length; i < il;i++ ) {
      let enemy = databus.enemys[i]

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
      this.player.x += databus.moveX
    }
    if (this.handShank.touched
      && (this.player.y + databus.moveY) > 0
      && (this.player.y + databus.moveY) < hground - 40
    ){
      this.player.y += databus.moveY
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
    // } else if (this.handShank.touched && !this.handShank.isInsite){
      //触摸地方不在手柄里
      // let opx = this.handShank.x + this.handShank.width / 2
      // let opy = this.handShank.y + this.handShank.height / 2
      // let tachX = databus.x + databus.transX
      // let tachY = databus.y + databus.transX
      // let l = Math.sqrt(Math.pow(opx - tachX, 2) + Math.pow(opy - tachY, 2))/60;
      // let x = (tachX - opx + l * opx) / l
      // let y = (tachY - opy + l * opy) / l
      // console.log('0000000000000000000',x,y)
      // this.handShank.tx = x
      // this.handShank.ty = y
      // let scop = Math.sqrt(Math.pow((databus.x + databus.transX - opx), 2) + Math.pow((databus.y + databus.transY - opy),2))
      // let x = 
    // }
    let pobj = {}
    pobj.x1 = databus.x + databus.transX//点击
    pobj.x2 = this.handShank.x + 60
    pobj.y1 = (databus.y + databus.transY)
    pobj.y2 = this.handShank.y + 60
    getRoteImg(pobj, this.player)
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
    ctx.drawImage(sharedCanvas, databus.transX, databus.transY, 1200, 800)
    // 主域绘制
    // openDataContext.postMessage({
    //   type: 'friends',
    //   text: 'tgregt',
    // });
    openDataContext.postMessage({
      data: databus,
      command: 'render'
    })
    // 游戏结束停止帧循环
    if ( databus.gameOver ) {
      this.gameinfo.renderGameOver(ctx, databus.score)

      if ( !this.hasEventBind ) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.removeEventListener('touchstart',this.handShank.touchstartEvent)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if ( databus.gameOver )
      return;

    this.bg.update()

    databus.bullets
           .concat(databus.enemys)
           .forEach((item) => {
             item.update(this.player)
            })
    
    this.enemyGenerate()

    this.collisionDetection()

    if (databus.frame % 10 === 0 && this.righthandshank.touched ) {

      this.player.shoot()
      this.music.playShoot()
    }
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}
