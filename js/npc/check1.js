import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import { getRoteImg } from '../utils/index'
import { type, type2, type3 } from './enemyObjs.js'
import {
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
      this.createEnemy1,
      this.createEnemy2,
      this.createEnemy3
    ]
  }
  createEnemy() {
    for (let i in this.createEnemys) {
      this.createEnemys[i]()
    }
  }
  creating(){
    if (databus.frame % 2e1 === 0) {
      // if (databus.enemys.size < 50) {
        this.createEnemy()
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
    for (let li of list) {
      databus.enemys.add(li)
    }
  }
  createEnemy3() {
    let list = type3()
    for (let li of list) {
      databus.enemys.add(li)
    }
  }
}
