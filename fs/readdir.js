const fs  =require('fs')
const path = require('path')

function readDirp(dir) {
  fs.readdir(dir,(err,files)=>{
    files.forEach(file=>{
      const current = path.join(dir,file)
      fs.stat(current,(err,data)=>{
        console.log(current);
      })
    })
  })
}

readDirp('./')