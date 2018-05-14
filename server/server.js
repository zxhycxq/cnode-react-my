const express=require('express')
const ReactSSR=require('react-dom/server')
const session=require('express-session')
const favicon=require('serve-favicon')
const fs=require('fs')
const path=require('path')
const app=express()
const bodyParser=require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use(favicon(path.join(__dirname,'../favicon.ico')))

app.use('/api/user',require('./util/handle-login'))
app.use('/api',require('./util/proxy'))
const isDev=process.env.NODE_ENV='development'

if(!isDev){
  const serverEntry=require('../dist/server-entry').default
  const template=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
  app.use('/public',express.static(path.join(__dirname,'../dist')))
  app.get('*',function (req,res) {
    const appString=ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!--app-->',appString))
  })
}else{
   const devState=require('./util/dev-static')
  devState(app)
}

app.listen(3333,function () {
  console.log(`监听3333`);
})
