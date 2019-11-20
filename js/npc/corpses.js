import Animation from '../base/animation'
import DataBus from '../databus'
import { getRoteImg, rnd } from '../utils/index'



let databus = new DataBus()
export default class Corpses {
  constructor() {
    // console.log(del1s)
   
  }
  init(ATLAS, X, Y, del1s){
    this.frame = 0
    this.del1s = del1s
    this.atlas = del1s[0]
    this.showLong = 1000
    this.visible = true
    this.rote = rnd(0, 360)
    this.x = X
    this.y = Y
  }
  playOvers(ctx) {
    
    
  }
  render(ctx) {
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
        -20,
        -20,
        40,40
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
      databus.pools.recover('corpses', this)
    } 
  }
}
