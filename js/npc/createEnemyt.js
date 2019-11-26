import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import { getRoteImg } from '../utils/index'
import { type, type2 } from './enemyObjs.js'
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
    this.createEnemys = [
      // this.createEnemy1,
      this.createEnemy1,
      // this.createEnemy3,
      // this.createEnemy4,
      // this.createEnemy5
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
  createEnemy2() {
    let list = type2()
    for (let li of list) {
      databus.enemys.add(li)
    }
  }
  createEnemy1() {
    let list = type()
    for (let li of list){
      databus.enemys.add(li)
    }
      
      // databus.enemys.add(type2())
    
    
    // if (databus.score>30){
    //   return 
    // }
    // let num = databus.frame%100/2
    // for (let i = 0; i < ~~(Math.random() * num);i++){
    //   let enemy = databus.pools.getItemByClass('enemy', Enemy)
    //   let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
    //   let tempc = rnd(1, 2)
    //   let findTime = rnd(200, 100)
    //   // let stopSpeed = tempc==1?0:30
    //   let stopSpeed =rnd(20,100)
    //   enemy.init(
    //     tempc,
    //     1,
    //     Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
    //     temp,
    //     bihu,
    //     bleed2,
    //     stopSpeed,
    //     findTime
    //   )
    //   databus.enemys.add(enemy)
    // }
  }
  createEnemy5() {
    let num = databus.frame % 100 / 5
    for (let i = 0; i < ~~(Math.random() * num); i++) {
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      let tempc = rnd(1, 2)
      let findTime = 0
      // let stopSpeed = tempc==1?0:30
      let stopSpeed = 0
      enemy.init(
        tempc,
        1,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp,
        bihu,
        bleed1,
        stopSpeed,
        findTime
      )
      databus.enemys.add(enemy)
    }
  }
  createEnemy4() {
    let num = databus.frame % 100 / 4
    for (let i = 0; i < ~~(Math.random() * num); i++) {
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      let tempc = rnd(1, 2)
      let findTime = rnd(0, 1) ? 10 : 70
      // let stopSpeed = tempc==1?0:30
      let stopSpeed = 0
      enemy.init(
        tempc,
        1,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp,
        spider,
        bleed1,
        stopSpeed,
        findTime
      )
      databus.enemys.add(enemy)
    }
  }
  createEnemy2() {
    let num = databus.frame % 100 / 1
    for (let i = 0; i < ~~(Math.random() * num); i++) {
      let enemy = databus.pools.getItemByClass('enemy', Enemy)
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      let tempc = rnd(1, 2)
      let findTime = rnd(0, 1) ? 10 : 70
      // let stopSpeed = tempc==1?0:30
      let stopSpeed = rnd(2, 50)
      enemy.init(
        tempc,
        1,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp,
        spider,
        bleed1,
        stopSpeed,
        findTime
      )
      databus.enemys.add(enemy)
    }
  }
  createEnemy3() {
 
    let enemy = databus.pools.getItemByClass('enemy', Enemy)
    let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
    let tempc = rnd(1, 3)
    let findTime = rnd(0, 1)?200:50
    // let stopSpeed = tempc==1?0:30
    let stopSpeed = rnd(10, 30)
    enemy.init(
      tempc,
      1,
      Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
      temp,
      spider,
      bleed1,
      stopSpeed,
      findTime
    )
      databus.enemys.add(enemy)
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
