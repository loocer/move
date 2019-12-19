import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import Check1 from './check1.js'
import Check2 from './check2.js'
import Check3 from './check3.js'
import {
  getRoteImg
} from '../utils/index'
import {
  type,
  type2
} from './enemyObjs.js'
import {
  enImgs1,
  enImgs2,
  enImgs3,
  bleed1,
  bleed2,
  del1s2,
  bihu,
  spider
} from '../utils/common.js'
const ENEMY_WIDTH = 50
const ENEMY_HEIGHT = 50
let databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class CreateEnemyt {
  constructor() {
    this.check1 = new Check1()
    this.check2 = new Check2()
    this.check3 = new Check3()
  }
  main() {
    this.check1.creating(databus)
    // if (databus.score > 400) {
    //   if(databus.enemys==30){
    //     this.check1.creating(databus)
    //     this.check2.creating(databus)
    //     this.check3.creating(databus)
    //   }
    //   return 
    // } else if (databus.score > 200) {
    //   if (databus.enemys == 20) {
    //     this.check2.creating(databus)
    //     this.check3.creating(databus)
    //   }
    //   return
    // } else if (databus.score > 50) {
    //   if (databus.enemys == 10) {
    //     this.check2.creating(databus)
    //     this.check1.creating(databus)
    //   }
      
    //   return 
    // }else{
    //   if (databus.enemys ==10) {
    //     this.check1.creating(databus)
    //   }
      
    //   return
    // }
  }
}