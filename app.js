const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.get('/', function(req, res) {
	//res.sendFile(path.join(__dirname + '/index.html'));
	res.send('Hello person.');
});

app.use('/public', express.static('public'));

app.listen(port, function(err) {
    if (err) throw err;
	console.log(`The app is listening on port ${port}`);
});
