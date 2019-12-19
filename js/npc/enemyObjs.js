import Enemy from './enemy'
import Enemy2 from './enemy2'
import Enemy3 from './enemy3'
import DataBus from '../databus'
let databus = new DataBus()
import {
  bleed1,
  bleed2,
  del1s2,
  bihu,
  duobi,
  GAME_IMG,
} from '../utils/common.js'
function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}
const ENEMY_WIDTH = 50
const ENEMY_HEIGHT = 50
const creademo = (tempc, findTime, stopSpeed, findIndex)=>{
  let enemy = databus.pools.getItemByClass('enemy', Enemy)
  let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
  let leftP = window.innerWidth + ENEMY_WIDTH + databus.transX + rnd(0,200)
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
const create1 = (tempc, findTime, stopSpeed, findIndex,timePics) => {
  let enemy = databus.pools.getItemByClass('enemy', Enemy)
  let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
  // let pic = rnd(0, 1) ? bihu : GAME_IMG.get('spider')
  enemy.init(
    tempc,
    1,
    temp,
    Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
    timePics,
    bleed2,
    stopSpeed,
    findTime,
    findIndex
  )
  return enemy
}
const cread3 = (tempc, findTime, stopSpeed, findIndex) => {
  let enemy = databus.pools.getItemByClass('enemy', Enemy2)
  let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
  let pic = GAME_IMG.get('yellow_bugs')
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
const create3 = (tempc, findTime, stopSpeed, findIndex, timePics) => {
  let enemy = databus.pools.getItemByClass('enemy', Enemy3)
  let temp = rnd(databus.transY, window.innerHeight + ENEMY_HEIGHT + databus.transY)
  // let pic = rnd(0, 1) ? bihu : GAME_IMG.get('spider')
  enemy.init(
    tempc,
    1,
    temp,
    Math.round(Math.random()) ? window.innerWidth + ENEMY_WIDTH + databus.transX : 0,
    timePics,
    bleed2,
    stopSpeed,
    findTime,
    findIndex
  )
  return enemy
}
export const type = () => {
  return [
    creademo(1, 0, 10, 2),
  ]
}

export const type2 = () => {
  return [
    create1(1, 0, 10, 2, GAME_IMG.get('spider')),
  ]
}
export const type3=()=> {
  return [
    create3(1, 0, 70, 2, GAME_IMG.get('bihu_bugs')),
  ]
}
export const type4 = () => {
  return [
    create3(1, 0, 70, 2, GAME_IMG.get('bihu_bugs')),
  ]
}