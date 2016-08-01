const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'hbs');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {title: 'woodsapp'});
});

app.get('/about', function(req, res) {
    res.render('about', {title: 'woodsapp'});
});

app.get('/hello/:name', function(req, res) {
    res.render('hello', {title: 'woodsapp', name: req.params.name});
});

app.listen(port, function(err) {
    if (err) throw err;
	console.log(`The app is listening on port ${port}`);
});
