import Animation from '../base/animation'
import DataBus from '../databus'
import GameTool from './index'
import Boom from './boom'
import Accelerate from './accelerate'
import ChangeBullet from './changeBullet'
const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_IMG_SRC2 = 'images/hero.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40
import {
  groundWidth,
  groundHeight,
  screenWidth,
  screenHeight
} from '../utils/common'
let databus = new DataBus()
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class Create {
  constructor() {
  }
  createEnemy1() {
    // return
      // let enemy = databus.pool.getItemByClass('enemy', enemy)
    // if (databus.frame%1e3==0){
    //   let boom = new Boom(rnd(0, groundWidth), rnd(0, screenHeight))
    //   databus.gameTools.push(boom)
    // }
    if (databus.enemys.size >5) {
      let flag = false
      databus.gameTools.forEach((item) => {
        if (item.name =='boom'){
          flag = true
        }
      })
      if(!flag){
        let boom = databus.pools.getItemByClass('boom', Boom)
        boom.init(rnd(0, groundWidth), rnd(0, screenHeight))
        databus.gameTools.push(boom)
      }
      
    }
    if (databus.enemys.size > 10) {
      let flag = false
      databus.gameTools.forEach((item) => {
        if (item.name == 'accelerate') {
          flag = true
        }
      })
      if (!flag) {
        let boom = databus.pools.getItemByClass('accelerate', Accelerate)
        boom.init(rnd(0, groundWidth), rnd(0, screenHeight))
        databus.gameTools.push(boom)
      }

    }
    // if (databus.frame % 3e3 == 0) {
    //   let boom = databus.pools.getItemByClass('accelerate', Accelerate)
    //   boom.init(rnd(0, groundWidth), rnd(0, screenHeight))
    //   databus.gameTools.push(boom)
    // }
    // if (databus.frame % 3e5 == 0) {
    //   let boom = databus.pools.getItemByClass('changeBullet', ChangeBullet)
    //   boom.init(rnd(0, groundWidth), rnd(0, screenHeight))
    //   databus.gameTools.push(boom)
    // }
  }
}
