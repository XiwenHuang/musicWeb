'use strict'

const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const xtpl = require('xtpl')
const musics = require(path.join(__dirname, 'musics.json'))
const server = http.createServer()

server.on('request', (req, res) => {
  if(req.url.includes('list.html') || req.url =='/'){
    xtpl.renderFile(path.join(__dirname, 'list.html'), {musicsArr: musics}, (err, content) => {
      // 声明后台传到浏览器的数据类型
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(content)
    })
  }else if(req.url.includes('site.css')) {
    fs.readFile(path.join(__dirname, 'statics/site.css'), (err, data) => {
      res.setHeader('Content-Type', 'text/css;charset=utf-8')
      res.end(data)
    })
  }else if(req.url.includes('jquery')) {
    fs.readFile(path.join(__dirname, 'statics/jquery.min.js'), (err, data) => {
      res.setHeader('Content-Type', 'text/javascript;charset=utf-8')
      res.end(data)
    })
  }else if(req.url.includes('mp3')) {
    const newURLString = querystring.unescape(req.url)
    fs.readFile(path.join(__dirname, newURLString), (err, data) => {
      res.setHeader('Content-Type', 'audio/mpeg;charset=utf-8')
      res.end(data)
    })
  }else if(req.url.includes('favicon.ico')) {
    fs.readFile(path.join(__dirname, 'statics/favicon.ico'), (err, data) => {
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(data)
     })
    }
  })

server.listen(8899, '127.0.0.1', err => {
  if(err){
    console.log(err)
    return
  }
  console.log('server is OK')
})
