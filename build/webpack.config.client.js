const path = require ('path')
const webpack = require ('webpack')
const webpackMerge = require ('webpack-merge')
const HTMLPlugin = require ('html-webpack-plugin')
const isDev=process.env.NODE_ENV==='development'
const baseConfig=require('./webpack.base')

const config = webpackMerge(baseConfig,{
  entry: {
    app: path.join (__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join (__dirname, '../dist'),
    publicPath: "/public/"
  },
  plugins: [
    new HTMLPlugin ({
      template:path.join(__dirname,'../client/template.html')
    }),
    new HTMLPlugin ({
      template:'!!ejs-compiled-loader!' + path.join(__dirname,'../client/server.template.ejs'),
      filename:'server.ejs'
    })
  ]
})

if(isDev){
  config.devtool='#cheap-module-eval-source-map'
  config.entry={
    app:[
        "react-hot-loader/patch",
        path.join(__dirname,'../client/app.js')
    ]
  }
  config.devServer={
    host:'0.0.0.0',
    compress: true,
    port:'8888',
    // contentBase:path.join(__dirname,'../dist'),
    hot:true,
    overlay:{
      errors:true
    },
    publicPath:'/public/',
    historyApiFallback:{
      index:'/public/index.html'
    },
   proxy:{
      '/api':'http://localhost:3333'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports=config
