const axios = require ('axios')
const path = require ('path')
const webpack = require ('webpack')
const ejs = require ('ejs')
const serialize = require ('serialize-javascript')
const ReactDomServer = require ('react-dom/server')
const MemoryFs = require ('memory-fs')
const proxy = require ('http-proxy-middleware')
const serverConfig = require ('../../build/webpack.config.server')
var asyncBootstrap = require ('react-async-bootstrapper').default
import Helmet=require('react-helmet').default

const rederServer=require('./server-render')

const getTemplate = () => {
  return new Promise ((resolve, reject) => {
    axios.get ('http://localhost:8888/public/server.ejs')
         .then (res => {
           resolve (res.data)
         })
         .catch (reject)
  })
}

// const Module = module.constructor
const NativeModule = require ('module')
const vm = require ('vm')

const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}}
  const wrapper = NativeModule.wrap (bundle)
  const script = new vm.Script (wrapper, {
    filename: filename,
    displayErrors: true,
  })
  // process.env.NODE_ENV
  const result = script.runInThisContext ()
  result.call (m.exports, m.exports, require, m)
  return m
}
const mfs = new MemoryFs

const serverCompiler = webpack (serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle;
serverCompiler.watch ({}, (err, state) => {
  if (err) throw err
  state = state.toJson ()
  state.errors.forEach (err => console.error (err))
  state.warnings.forEach (warn => console.warn (warn))
  
  const bundlePath = path.join (
      serverConfig.output.path,
      serverConfig.output.filename
  )
  
  const bundle = mfs.readFileSync (bundlePath, 'utf-8')
  // const m = new Module ()
  // m._compile (bundle,'server-entry.js')
  const m = getModuleFromString (bundle, 'server-entry.js')
  //需要指定名称
  serverBundle = m.exports
  // createStoreMap = m.exports.createStoreMap
})



module.exports = function (app) {
  app.use ('/public', proxy ({
    target: 'http://localhost:8888'
  }))
  
  app.get ('*', function (req, res,next) {
    if(!serverBundle){
      return res.send('wait for complie')
    }
    getTemplate ().then (template => {
      return rederServer(serverBundle,template,req, res)
    }).catch(next)
  })
}
