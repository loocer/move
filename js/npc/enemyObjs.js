import Enemy from './enemy'
import DataBus from '../databus'
let databus = new DataBus()
import {
  enImgs1,
  enImgs2,
  enImgs3,
  bleed1,
  bleed2,
  del1s2,
  bihu,
  duobi,
  spider
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
const creademoTop = (tempc, findTime, stopSpeed, findIndex) => {
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
export const type = () => {
  return [
    creademo(1,200,10,2),
    creademoTop(1, 100, 60,2),
    creademo(1, 200, 100, 2),
  ]
}

export const type2 = () => {
  return [
    // creademo(1, 200, 10,1),
    // creademo(1, 100, 30,1),
    // creademo(1, 100, 70,1),,
    // creademoTop(1, 100, 5,1),
    // creademoTop(1, 100, 40,1),
    // creademoTop(1, 100, 5,1),
  ]
}
export const type3=()=> {
  return [
    creademo(1, 200, 10, 2),
    // creademo(1, 100, 30,1),
    // creademo(1, 100, 70,1),,
    creademoTop(1, 100, 70, 2),
    // creademoTop(1, 100, 40,1),
    // creademoTop(1, 100, 5,1),
  ]
}