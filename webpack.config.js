const path = require('path');
     
// Node grabs the exports module file and run it with the options
// we provide 
module.exports = 
{
	entry: './src/app.js',
	output: 
	{
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	}
}