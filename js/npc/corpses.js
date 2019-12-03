
import DataBus from '../databus'
import { rnd } from '../utils/index'
import {
  biHuBody
} from '../utils/common.js'


let dataBus = new DataBus()

export default class Corpses {
  constructor() {
    // console.log(del1s)
   
  }
  init(ATLAS, X, Y, del1s){
    this.frame = 0
    this.del1s = del1s
    this.atlas = del1s[0]
    this.showLong = 2000
    this.visible = true
    this.bodyPicS = biHuBody
    this.rote = rnd(0, 360)
    this.x = X
    this.y = Y
    this.Bodys = []
    this.initBody()
  }
  initBody() {
    for(let i =0;i<4;i++){
      let fuDu = rnd(0,360)
      let maxR = rnd(0,50)
      let height = rnd(0,1)?0:30
      let width = rnd(0,5)*30
      let size = rnd(10, 25)
      this.Bodys.push([fuDu, maxR, height, width, size])
    }
  }
  renderBody(ctx){
    for(let i =0;i<4;i++){
      let obj = this.Bodys[i]
      let fud = obj[0]
      let banging=null
      // if (this.frame<5){
        banging = this.frame * 10 < obj[1] ? this.frame * 10 : obj[1]
      // }else{
      //   let banging = this.frame * 10 < obj[1] ? this.frame * 10 : obj[1]
      // }
      
      let r = obj[1]

      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(obj[0]* Math.PI / 180)
      let x = 0 + banging * Math.cos(fud)
      let y = 0 + banging * Math.sin(fud)
      let size = obj[4]
      ctx.drawImage(
        this.bodyPicS,
          0, 0, obj[2],obj[3],
          x,
          y,
        size, size
      )
      ctx.restore()
    }
  }
  render(ctx) {
    this.renderBody(ctx)
    // ctx.beginPath();
    // ctx.strokeStyle = "rgba(206, 118, 46, 1)";
    // ctx.lineWidth = 4;
    // // ctx.shadowOffsetX = 1;
    // // ctx.shadowOffsetY = 1;
    // // ctx.shadowBlur = 20;
    // // ctx.shadowColor = "#ce762ea1";
    // ctx.arc(this.x - 20,  this.y - 20,20, 0, 2 * Math.PI);
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.rote * Math.PI / 180)
      ctx.drawImage(
        this.atlas ,
        0, 0, 100,100,
        -15,
        -15,
        30,30
      )
    ctx.restore()
    
  }
  update() {
    if (!this.visible)
      return 
    this.frame++
    // console.log(this.del1s, ~~(this.frame / 10), '-------------', this.del1s[~~(this.frame / 10)])
    // this.atlas = this.del1s[~~(this.frame/8)]
    if (this.frame > this.showLong) {
      this.visible = false
      dataBus.pools.recover('corpses', this)
    } 
  }
}
