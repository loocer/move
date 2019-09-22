import Animation from '../base/animation'
import DataBus from '../databus'
import GameTool from './index'
import bullet1 from './bullet1'
import bullet2 from './bullet2'
import Boom from './boom'
const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_IMG_SRC2 = 'images/hero.png'
let databus = new DataBus()
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class Create {
  constructor() {
  }
  createEnemy() {
    let enemy = new GameTool()
    let boom = new Boom()
    // let enemy = databus.pool.getItemByClass('enemy', enemy)
    databus.gameTools.push(enemy)
    databus.gameTools.push(boom)
  }
}
