export function getRoteImg(pobj, acObj) {
  let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
  if (pobj.x1 > pobj.x2) {
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 90
  } else if (pobj.x1 < pobj.x2) {
    acObj.rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
  }
}