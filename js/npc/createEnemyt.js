import Animation from '../base/animation'
import DataBus from '../databus'
import Enemy from './enemy'
import { getRoteImg } from '../utils/index'
const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_IMG_SRC2 = 'images/hero.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40
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
  createEnemy(){
    for (let i in this.createEnemys){
      if (databus.createEnemysStatus == +i+1) {
        if (databus.frame % 100 == 0) {
          this.createEnemys[i]()
        }
      }
    }
  }
  createEnemy1() {
    for (let i = 0; i < ~~(Math.random() * 10);i++){
      let enemy = new Enemy(
        ENEMY_IMG_SRC,
        ENEMY_WIDTH,
        ENEMY_HEIGHT
      )
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      enemy.init(
        .3,
        1,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp
      )
      // let enemy = databus.pool.getItemByClass('enemy', enemy)

      databus.enemys.push(enemy)
    }
  }
  createEnemy2() {
    for (let i = 0; i < ~~(Math.random() * 10); i++) {
      let enemy = new Enemy(
        ENEMY_IMG_SRC2,
        ENEMY_WIDTH,
        ENEMY_HEIGHT
      )
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      enemy.init(
        .3,
        2,
        Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
        temp
      )
      // let enemy = databus.pool.getItemByClass('enemy', enemy)

      databus.enemys.push(enemy)
    }

    // let enemy = new Enemy(
    //   ENEMY_IMG_SRC,
    //   ENEMY_WIDTH,
    //   ENEMY_HEIGHT
    // )
    // let temp = rnd(0, window.innerWidth - ENEMY_WIDTH)
    // // console.log(temp,'--------------------')
    // enemy.init(
    //   .3,
    //   1,
    //   temp + databus.transX,
    //   Math.round(Math.random()) ? window.innerHeight + ENEMY_WIDTH + databus.transY : 0
    // )
  }
  createEnemy3() {
    for (let i = 0; i < ~~(Math.random() * 10); i++) {
      let enemy = new Enemy(
        ENEMY_IMG_SRC,
        ENEMY_WIDTH,
        ENEMY_HEIGHT
      )
      let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
      let temp1 = rnd(databus.transX, window.innerWidth + ENEMY_WIDTH + databus.transX)
      if (Math.round(Math.random())){
        enemy.init(
          .3,
          5,
          Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
          temp
        )
      }else{
        enemy.init(
          .3,
          3,
          temp1,
          Math.round(Math.random()) ? window.innerHeight + ENEMY_HEIGHT + databus.transY : 0,
        )
      }
      
      // let enemy = databus.pool.getItemByClass('enemy', enemy)

      databus.enemys.push(enemy)
    }
  }
}
