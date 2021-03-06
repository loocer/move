export const icon = [{
    name: 'boom-icon',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/icon/boom.png',
  },
  {
    name: 'addspeed-icon',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/icon/add-speed.png',
  }, {
    name: 'fire-color',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/icon/firing.png'
  }
]
export const booms = [{
    name: 'boom1',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/1.png',
  },
  {
    name: 'boom2',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/2.png',
  },
  {
    name: 'boom3',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/3.png',
  },
  {
    name: 'boom4',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/4.png',
  },
  {
    name: 'boom5',
    fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/booms/5.png',
  }
]
export const antBug = (() => {
  let list = []
  for (let i = 1; i < 6; i++) {
    list.push({
      name: 'antBugs' + i,
      fileId: `cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/enemy_ant/${i}.png`,
    })
  }
  return list
})()
export const bihuBug = (() => {
  let list = []
  for (let i = 1; i < 6; i++) {
    list.push({
      name: 'bihuBugs' + i,
      fileId: `cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/enemy_bihu/${i}.png`,
    })
  }
  return list
})()
export const yellowBug = (() => {
  let list = []
  for (let i = 1; i < 21; i++) {
    list.push({
      name: 'yellowBugs' + i,
      fileId: `cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/enemy_yellowBug/${i}.png`,
    })
  }
  return list
})()
export const netResourse = [{
  name: 'title',
  fileId: 'cloud://imge8-5z6gt.696d-imge8-5z6gt-1300789023/button/tittle.png',
}, ...booms, ...icon, ...yellowBug, ...antBug, ...bihuBug]