const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

const appTitle = 'WoodsApp';

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.use('/public', express.static('public'));
app.use('/css', express.static('css'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies

app.get('/', function(req, res) {
	res.render('index', {title: appTitle});
});

app.post('/', function(req, res) {
    res.send('Posted to the homepage of WoodsApp!\n');
});

app.post('/namegen', function(req, res) {
    // console.log('q:', req.query, 'p:', req.params, 'b:', req.body.noSpace);
    var allowSpace = undefined;
    if (req.body.noSpace !== undefined)
        allowSpace = {hasSpace: false};
    // number of entries in db, could be retrieved with db.count()
    const rand = Math.floor(Math.random() * 708);
    const mongo = require('mongodb').MongoClient;
    mongo.connect(process.env.MONGOLAB_URI, function (err, db) {
        if (err)
            console.log('Unable to connect to the mongoDB server. Error:', err);
        else
        {
            db.collection('projectNames')
                .find(allowSpace)
                .limit(-1)
                .skip(rand)
                .next()
                .then(function(result) {
                    db.close();
                    res.json({id: rand, name: result.name, hasSpace: result.hasSpace});
                }, function(err) {
                    db.close();
                    throw err;
                });
        }
    });
});

app.get('/about', function(req, res) {
    res.render('about', {title: appTitle});
});

app.get('/hello/:name', function(req, res) {
    res.render('hello', {title: appTitle, name: req.params.name});
});

app.listen(port, function(err) {
    if (err) throw err;
	console.log(`The app is listening on port ${port}`);
});
