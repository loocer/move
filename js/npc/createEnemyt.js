import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import { getRoteImg } from '../utils/index'
import {
  enImgs1,
  enImgs2,
  enImgs3,
  del1s1,
  del1s2,
} from '../utils/common.js'
const ENEMY_WIDTH = 50
const ENEMY_HEIGHT = 50
let databus = new DataBus()
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class CreateEnemyt {
  constructor() {
    this.createEnemys = [
      this.createEnemy1,
      // this.createEnemy2,
      // this.createEnemy3
    ]
  }
  createEnemy(){
    
    // this.createEnemy1()
    // this.createEnemy1()
    // this.createEnemy1()
    for (let i in this.createEnemys){
      // if (databus.createEnemysStatus == +i+1) {
        this.createEnemys[i]()
        // if (databus.frame % 1e3 == 0) {
        //   this.createEnemys[i]()
        // }
      // }
    }
  }
  createEnemy1() {
    // if (databus.score>30){
    //   return 
    // }
    let num = databus.frame/100
    console.log(num)
    for (let i = 0; i < ~~(Math.random() * num);i++){
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      enemy.init(
        2,
        1,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp,
        [enImgs1[0], enImgs2[0]],
        del1s1
      )
      databus.enemys.push(enemy)
    }
  }
  createEnemy2() {
    if (databus.score > 400 || databus.score<30) {
      return
    }
    for (let i = 0; i < ~~(Math.random() * 6); i++) {
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      enemy.init(
        .5,
        1,
         0,
        temp,
        [enImgs1[0], enImgs2[0]],
        del1s1
      )
      databus.enemys.push(enemy)
    }
  }
  createEnemy3() {
    if (databus.score < 100) {
      return
    }
    for (let i = 0; i < ~~(Math.random() * 30); i++) {
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transX, window.innerWidth + ENEMY_WIDTH + databus.transX)
      enemy.init(
        .2,
        1,
        temp,
        0,
        [enImgs1[0], enImgs2[0]],
        del1s1
      )
      databus.enemys.push(enemy)
    }
  }
  // createEnemy3() {
  //   for (let i = 0; i < ~~(Math.random() * 30); i++) {
  //     let enemy = new Enemy(
  //       ENEMY_IMG_SRC,
  //       ENEMY_WIDTH,
  //       ENEMY_HEIGHT
  //     )
  //     let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
  //     let temp1 = rnd(databus.transX, window.innerWidth + ENEMY_WIDTH + databus.transX)
  //     if (Math.round(Math.random())){
  //       enemy.init(
  //         .3,
  //         5,
  //         Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
  //         temp,
  //         enImgs3
  //       )
  //     }else{
  //       enemy.init(
  //         .3,
  //         3,
  //         temp1,
  //         Math.round(Math.random()) ? window.innerHeight + ENEMY_HEIGHT + databus.transY : 0,
  //       )
  //     }
      
  //     databus.enemys.push(databus.pools.getItemByClass('enemy', Enemy))
  //   }
  // }
}
