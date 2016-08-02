var allowSpace = process.argv[2];

if (allowSpace && allowSpace.length > 0 && (allowSpace == 'false' || allowSpace == 0))
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
                const dir = result.name.toLowerCase();
                const fs = require('fs');
                if (!fs.existsSync(dir)){
                    fs.mkdirSync('./' + dir);
                }
                console.log('./' + dir);
                
            }, function(err) {
                db.close();
                throw err;
            });
    }
});