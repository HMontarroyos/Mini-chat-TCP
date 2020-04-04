var figlet = require('figlet');
var colors = require('colors');
colors.enable () ;

const chalk = require('chalk');
 
console.log(chalk.bgYellow('Hello world!'));
 
figlet('Seja Bem Vindo ao nosso Chat !!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

