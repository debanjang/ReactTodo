var webpack = require('webpack'); //import the webpack utilities
var path = require('path');
var envFile =require('node-env-file');

//Let the environment be picked up from the runtime environment.
//All variables in the runtime env are present in process.env in node.js
//If present, set it, if not present, we are on local, we will use development as the default.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Inject the env variables from given path into webpack.
//After injection, all the variables will be present under process.env variable
// For example,  API_KEY defined in the env files under config 
//are now stored as process.env.API_KEY
//try catch has tp be used since it will fail if there is no such file
try{
  envFile(path.join(__dirname,'config/'+process.env.NODE_ENV+'.env'));
}catch(e){
  //do nothing for the time being
}

module.exports = {
    entry:[
      'jquery/dist/jquery.min.js',
      'foundation-sites/dist/js/foundation.min.js',
      './app/app.jsx'
    ], //entry point for the application
    external: {
      jquery: 'jQuery'
    }, // variable names that external files may be using to access modules by. 
    //jquery module access will be granted through the use of 'jQuery' keyword
    plugins:[
      // variable names that internal files may be using to access modules by.
      //Internal files may be using the keywords 'jQuery' or '$' to access the jquery module.
      new webpack.ProvidePlugin({
        '$':'jquery',
        'jQuery':'jquery'
      }),

      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),

      //Inject the variables from webpack into bundle file.
      //This lets us define a variable where the chosen webpack variables are to be inserted
      //In this case, webpack.process.env
      new webpack.DefinePlugin({
        'webpack.process.env':{
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          API_KEY: JSON.stringify(process.env.API_KEY),
          AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
          DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
          PROJECT_ID: JSON.stringify(process.env.PROJECT_ID),
          STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
          MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID)
        }
      })
    ],
    output: {
        path: __dirname,       //in node.js, __dirname identifies the current folder (ReactTodo)
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
    //do not need the sourcemap in production
    devtool: process.env.NODE_ENV === 'production'?null:'cheap-module-eval-source-map'
};
