const axios = require ('axios')
const path = require ('path')
const webpack = require ('webpack')
const ReactDomServer = require ('react-dom/server')
const MemoryFs = require ('memory-fs')
const proxy = require ('http-proxy-middleware')
const serverConfig = require ('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise ((resolve, reject) => {
    axios.get ('http://localhost:8888/public/index.html')
         .then (res => {
           resolve (res.data)
         })
         .catch (reject)
  })
}

const Module = module.constructor
const mfs = new MemoryFs

const serverCompiler = webpack (serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle,  createStoreMap;
serverCompiler.watch ({}, (err, state) => {
  if (err) throw err
  state = state.toJson ()
  state.errors.forEach (err => console.error (err))
  state.warnings.forEach (warn => console.warn (warn))
  
  const bundlePath = path.join (
      serverConfig.output.path,
      serverConfig.output.filename
  )
  
  const bundle = mfs.readFileSync (bundlePath,'utf-8')
  const m = new Module ()
  m._compile (bundle,'server-entry.js')
  //需要指定名称
  serverBundle = m.exports.default
  createStoreMap = m.exports.createStoreMap
})

module.exports = function (app) {
  app.use('/public',proxy({
    target:'http://localhost:8888'
  }))
  
  app.get ('*', function (req, res) {
     getTemplate().then(template=>{
       const routerContext={}
       const app=serverBundle(createStoreMap(),routerContext,req.url)
       const content=ReactDomServer.renderToString(app)
       res.send(template.replace('<!--app-->',content))
     })
  })
}
