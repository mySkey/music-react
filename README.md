1.安装环境
npm install -g create-react-app

create-react-app '项目名'

npm install

npm start

2.打开webpack配置

npm run eject

3.关于打包问题

  不生成map文件，prod文件57行注释掉

  打包生成打包报告

  npm install webpack-bundle-analyzer --save-dev

  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  plugins:[
     ...
     new BundleAnalyzerPlugin()
  ]

  "analyze": "source-map-explorer dist/static/js/main.*"

4.使用redux

  安装  npm install --save redux
  npm install --save-dev redux-devtools

  https://github.com/mySkey/redux-demo

 