/**
 * Says hello to a person.
 *
 * @param name Name of the person to greet.
 */

var fs = require('fs'), Datastore = require('nedb'), PATH = require('path');
var db = new Datastore({filename : __dirname + '/datafile', autoload: true});

db.loadDatabase(function(err){
    if(err){ console.log(err); return;}
});

var sayHello = function(name) {
    return 'Hello, ' + name;
};


var register = function(name, path){

    if(path.indexOf('node_modules') >= 0){
        console.log('Can not include \'node_modules\' in [path].');
        process.exit(1);
    }

    path = path + '\\node_modules';

    console.log('real path', path);

    fs.lstat(path, function(err, stats){

        if(err) throw err;

        console.log('directory', stats.isDirectory());

        if(!stats.isDirectory()){
            console.log(path, 'is not a directory.');
            process.exit(1);
        }

        db.find({name : name}, function(err, docs){
            if(err) throw err;

            // console.log('docs : ', docs);

            if(docs.length == 0){
                db.insert({
                    name: name,
                    path: path
                }, function(err, newDoc){
                    if(err) throw err;
                    console.log('Registration success!', newDoc);
                });
            }else {
                console.log(docs)
            }
        });

    });
};

var remove = function(name){
    db.remove({name : name}, {}, function(err, numRemoved){
        console.log('Removed ', numRemoved, ' row(s).');
    });
};

var link = function(name){

    var path = PATH.resolve(PATH.normalize('.\\node_modules'));

    console.log(path);

    db.find({name: name}, function(err, docs){
        // console.log(docs);
        if(docs.length > 0){
            fs.symlink(docs[0].path, path, 'dir',function(err){
                if(err) throw err;

                console.log('Created a link!');
            });
        }else{
            console.log(name, 'is not found.');
        }
    });
};
var list = function(){
    db.find({}, function(err, docs){
        docs.forEach(function(item){
            console.log(item.name + '\t' + item.path);
        });
    });
};


exports.sayHello = sayHello;
exports.register = register;
exports.remove = remove;
exports.link = link;
exports.list = list;