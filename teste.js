var figlet = require('figlet');
var colors = require('colors');
colors.enable () ;
 
figlet('Seja Bem Vindo ao nosso Chat !!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});