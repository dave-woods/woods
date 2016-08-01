const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

app.get('/', function(req, res) {
	res.render('index');
});

app.listen(port, function(err) {
    if (err) throw err;
	console.log(`The app is listening on port ${port}`);
});
