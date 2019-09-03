import Animation from '../base/animation'
import DataBus from '../databus'
import GameTool from './index'
const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_IMG_SRC2 = 'images/hero.png'
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 40
let databus = new DataBus()
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
export default class Create {
  constructor() {
    this.createEnemy1()
  }
  createEnemy1() {
    let enemy = new GameTool()
    
      // let enemy = databus.pool.getItemByClass('enemy', enemy)
    databus.gameTools.push(enemy)
    
  }
}
