const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');
const fs = require('fs');

// var c = 0;
// lineReader.on('line', function(line) {
//     if (c < 10)
//         console.log('Line from file: ' + line);
//     c = c + 1;
// });

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

app.get('/namegen', function(req, res) {
    
    var allowSpace = undefined;
    if (req.query.allowSpace && req.query.allowSpace.length > 0 && (req.query.allowSpace == 'false' || req.query.allowSpace == 0))
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

// app.get('/namegen/add', function(req, res) {
//     const mongo = require('mongodb').MongoClient;
//     mongo.connect(process.env.MONGOLAB_URI, function (err, db) {
//         if (err)
//             console.log('Unable to connect to the mongoDB server. Error:', err);
//         else
//         {
//             const lineReader = require('readline').createInterface({
//                 input: fs.createReadStream('namegen/list')
//             });
//             lineReader.on('line', function(line, last) {
//                 const document = {name: line, hasSpace: (line.indexOf(' ') >= 0)};
//                 if (!last)
//                 {
//                     db.collection('projectNames').insert(document, function(err, data) {
//                         if (err) throw err;
//                     });
//                 }
//                 else
//                 {
//                     db.collection('projectNames').insert(document, function(err, data) {
//                         if (err) throw err;
//                         db.close();
//                         res.end('done');
//                     });
//                 }
//                 console.log(line);
//             });
//         }
//     });
// });

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
