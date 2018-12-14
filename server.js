
var express = require('express');

// Create the express app
var app = express();

/**
 *Heroku passes the port in the runtime environment.
 *The way to access environment variables in node is process.env.<param_name>
 */
const PORT = process.env.PORT || 3000;

/*app.use is used to add functionality to the express app
In the following line, we are asking the express server
to serve files from the public folder*/
app.use(express.static('public'));


/*which port the server is running on
the function to execute once the srver is up and running*/
app.listen(PORT, function(){
    console.log('Express Server is up and running on port 3000');
})
