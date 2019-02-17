var webpack = require('webpack'); //import the webpack utilities
var path = require('path');

module.exports = {
    entry:[
      'jquery/dist/jquery.min.js',
      'foundation-sites/dist/foundation.min.js',
      './app/app.jsx'
    ], //entry point for the application
    external: {
      jquery: 'jQuery'
    }, // variable names that external files may be using to access modules by. 
    //jquery module access will be granted through the use of 'jQuery' keyword
    plugins:[
      new webpack.ProvidePlugin({
        '$':'jquery',
        'jQuery':'jquery'
      }) // variable names that internal files may be using to access modules by.
      //Internal files may be using the keywords 'jQuery' or '$' to access the jquery module.
    ],
    output: {
        path: __dirname,       //in node.js, __dirname identifies the current folder (Hello React)
        filename: './public/bundle.js' //relative path to the output file. This file is auto-generated
    },
    resolve: {
        root:__dirname,
        modulesDirectories:[
            'node_modules',
            './app/components',
            './app/api'
        ],
        alias:{
          applicationStyles: 'app/styles/app.scss',
          actions: 'app/actions/actions.jsx',
          reducers: 'app/reducers/reducers.jsx',
          store: 'app/store/configureStore.jsx',
          app: 'app'
        },
        extensions: ['', '.js', '.jsx']  //what all file extensions to pick up
    },

    module:{
        loaders: [
            {
                loader: 'babel-loader',   //Loader that converts jsx to js
                query: {                  //query is an object through which presets can be used
                    presets: ['react', 'es2015', 'stage-0']  //presets are already defined objects in babel.
                                                //This particular config signifies that each file is first parsed
                                                //in accordance with React and then es2015 and so on.
                },
                test: /\.jsx?$/, //Regex that defines what files to be treated by this loader
                exclude: /(node_modules|bower_components)/ 
                  //Regex to define all out-of-scope directories for this loader.
            },
        ]
    },
    //Load Foundation through scss in order to use all the variables that come bundled with it.
    sassLoader:{
        includePaths:[
            path.resolve(__dirname,'./node_modules/foundation-sites/scss')
        ]
    },

    devtool: 'cheap-module-eval-source-map'
};
