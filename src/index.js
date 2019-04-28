'use strict'
const app = require('./config/server')
require('./app/routes/junta')(app);

//starting the server
app.listen(app.get('port'), () =>{
	console.log('server running on port ', app.get('port'));
});