import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import {
  getRoteImg
} from '../utils/index'
import {
  type,
  type2,
  type3
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
    this.createEnemys = [
      // this.createEnemy1,
      this.createEnemy1,
      // this.createEnemy3,
      // this.createEnemy4,
      // this.createEnemy5
    ]
  }
  createEnemy() {

    // this.createEnemy1()
    // this.createEnemy1()
    // this.createEnemy1()
    for (let i in this.createEnemys) {
      // if (databus.createEnemysStatus == +i+1) {
      this.createEnemys[i]()
      // if (databus.frame % 1e3 == 0) {
      //   this.createEnemys[i]()
      // }
      // }
    }
  }
  creating() {
    // if (databus.frame % 20 === 0) {
    // if (databus.enemys.size < 50) {
    this.createEnemy()
    // }
    // }
  }
  createEnemy2() {
    let list = type2()
    for (let li of list) {
      databus.enemys.add(li)
    }
  }
  createEnemy1() {
    let list = type3()
    for (let li of list) {
      databus.enemys.add(li)
    }
  }
  creademo(tempc, findTime, stopSpeed, findIndex) {
    let enemy = databus.pools.getItemByClass('enemy', Enemy)
    let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
    let leftP = window.innerWidth + ENEMY_WIDTH + databus.transX + rnd(0, 200)
    let rightP = rnd(-200, 0)
    enemy.init(
      tempc,
      1,
      Math.round(Math.random()) ? leftP : rightP,
      temp,
      duobi,
      bleed1,
      stopSpeed,
      findTime,
      findIndex
    )
    return enemy
  }
  creademoTop(tempc, findTime, stopSpeed, findIndex) {
    let enemy = databus.pools.getItemByClass('enemy', Enemy)
    let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
    let pic = rnd(0, 1) ? bihu : spider
    enemy.init(
      tempc,
      1,
      temp,
      Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
      pic,
      bleed2,
      stopSpeed,
      findTime,
      findIndex
    )
    return enemy
  }
}