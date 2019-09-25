import Animation from '../base/animation'
import DataBus from '../databus'
import { getRoteImg } from '../utils/index'



let databus = new DataBus()
export default class Corpses {
  constructor(ATLAS, X, Y, del1s) {
    // console.log(del1s)
    this.frame = 0
    this.del1s = del1s
    this.atlas = del1s[0]
    this.showLong = 1600
    this.visible = true
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
    // ctx.rotate(this.rotate * Math.PI / 180)
    // ctx.drawImage(
    //   atlas,
    //   0,
    //   0,
    //   50,
    //   50
    // )
    // ctx.restore()
    // ctx.beginPath();
    // ctx.lineWidth = 5;
    // ctx.arc(0, 0, 15+2 * this.lifeValue , 0, 2 * Math.PI);
    // ctx.stroke();
   
    // ctx.stroke();
      ctx.drawImage(
        this.atlas ,
        0, 0, 100,100,
        0,
        0,
        40,40
      )
    ctx.restore()
  }
  update() {
    this.frame++
    // console.log(this.del1s, ~~(this.frame / 10), '-------------', this.del1s[~~(this.frame / 10)])
    // this.atlas = this.del1s[~~(this.frame/8)]
    if (this.frame > this.showLong) {
      this.visible = false
    } 
  }
}
