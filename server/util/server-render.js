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

const getStoreState = (stores) => {
  return Object.keys (stores).reduce ((result, storeName) => {
    result[storeName] = stores[storeName].toJson ()
    return result
  }, {})
}

module.exports=(bundle,template,req,res)=>{
  return new Promise((resolve, reject)=>{
    const createStoreMap=bundle.createStoreMap
    const createApp=bundle.default
    const routerContext = {}
    const stores = createStoreMap ()
    const app = serverBundle (stores, routerContext, req.url)
    asyncBootstrap (app).then (() => {
      if (routerContext.url) {
        res.status (302).setHeader ('Location', routerContext.url)
        res.end ()
        return
      }
    })
    const helmet=Helmet.rewind();
    const state = getStoreState (stores)
    const content = ReactDomServer.renderToString (app)
    // res.send(template.replace('<!--app-->',content))
    const html = ejs.render (template, {
      appString: content,
      initialState: serialize(state),
      meta:helmet.meta.toString(),
      title:helmet.title.toString(),
      style:helmet.style.toString(),
      link:helmet.link.toString()
    })
    res.send (html)
    resolve()
  }).catch(reject)
  })
}
