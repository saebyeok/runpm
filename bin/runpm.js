#!/usr/bin/env node

var _ = require('lodash');
var path = require('path');
var lib = require('../lib/index.js');

var isSetting = false;


console.log('have', process.argv.length, 'arguments');

_.forEach(process.argv, function(n, idx){
    if(n.indexOf('--') >= 0){
        isSetting = true;
        switch (n){
            case '--config' :
                var name = process.argv[idx+1];
                var temp = process.argv[idx+2] || '.';
                var target = path.resolve(path.normalize(temp));

                console.log('name ' , name);
                console.log('target ', target);

                lib.register(name, target);

                break;
            case '--remove' :
                var name = process.argv[idx+1];
                lib.remove(name);
                break;
            default :
                console.log('--config : set path');
                break;
        }
        // console.log('parameter ' , n);
    }
});

// General usage
if(!isSetting){
    _.forEach(process.argv, function(n, idx){
        if(n.indexOf('runpm') >= 0){
            var name = process.argv[idx + 1];
            if(name == undefined){
                console.log('[name] is undefined.');
                usage();
                process.exit(1);
            }

            if(name == 'list'){
                lib.list();
            } else {
                lib.link(name);
            }

        }
    });
}



function usage () {
    console.log('Create a link folder at current path from [name]: runpm [name]');
    console.log('Register current path to [name] : runpm --config [name] [path]');
    console.log('Remove link of [name] : runpm --remove [name]');
    console.log(' \t name : Link name');
    console.log(' \t path : Setting path include [node_modules]. Default : current folder ');
}
