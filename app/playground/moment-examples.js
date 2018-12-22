var moment = require('moment');

var now = moment();
var timestamp = now.unix(); //This is how we store date in DB. Seconds elapsed from 01/01/1970

var currentMoment = moment.unix(timestamp); //"2018-12-21T10:39:45.000" : Default Format

console.log("Current Moment", currentMoment.format('MMMM Do, YYYY @ h:mm A'));

