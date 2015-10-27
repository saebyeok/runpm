
 ```runpm.js``` is a package manager to reuse ```node_modules ``` folders. 

##Installation

If you have the node package manager, npm, installed: 
```shell
npm install -g runpm
``` 

##Getting Started

Register a folder where a specific project directory you want :
```shell
/path/to/project1 $ runpm --config [name]
```

Create a link to an other project: 
```shell
/path/to/project2 $ runpm [name]
```

You can find registered list: 
```shell
 $ runpm list
```

If you want to remove a registered link : 
```shell
 $ runpm --remove [name]
```


##License
MIT 



